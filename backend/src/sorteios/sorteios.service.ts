import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sorteio } from './sorteio.entity';
import { Jogo, JogoStatus, JogoTipo } from '../jogos/jogo.entity';
import {
  Participacao,
  ParticipacaoStatus,
} from '../participacoes/participacao.entity';
import { NotificacoesService } from '../notificacoes/notificacoes.service';
import { NotificacoesGateway } from '../notificacoes/notificacoes.gateway';
import { AuditoriaService } from '../auditoria/auditoria.service';
import * as crypto from 'crypto';

@Injectable()
export class SorteiosService {
  constructor(
    @InjectRepository(Sorteio)
    private sorteiosRepository: Repository<Sorteio>,
    @InjectRepository(Jogo)
    private jogosRepository: Repository<Jogo>,
    @InjectRepository(Participacao)
    private participacoesRepository: Repository<Participacao>,
    private notificacoesService: NotificacoesService,
    private notificacoesGateway: NotificacoesGateway,
    private auditoriaService: AuditoriaService,
  ) {}

  async realizarSorteio(
    jogoId: string,
    utilizadorId: string,
    aldeiaId?: string,
  ): Promise<Sorteio> {
    const jogo = await this.jogosRepository.findOne({
      where: { id: jogoId },
      relations: ['evento'],
    });

    if (!jogo) throw new NotFoundException('Jogo não encontrado');
    if (jogo.estado !== JogoStatus.ATIVO) {
      throw new BadRequestException('Apenas jogos ativos podem ser sorteados');
    }

    // Obter todas as participações pagas
    const participacoes = await this.participacoesRepository.find({
      where: { jogoId: jogoId, status: ParticipacaoStatus.PAGO },
      relations: ['utilizador'],
    });

    if (participacoes.length === 0) {
      throw new BadRequestException(
        'Não existem participações pagas para este jogo',
      );
    }

    // Gerar seed e calcular resultado
    const seed = crypto.randomBytes(16).toString('hex');
    const hash = crypto.createHash('sha256').update(seed).digest('hex');

    const hashInt = BigInt(`0x${hash}`);
    const indexVencedor = Number(hashInt % BigInt(participacoes.length));
    const vencedor = participacoes[indexVencedor];

    let resultadoFormatado = '';
    if (jogo.tipo === JogoTipo.POIO_VACA) {
      const coord = vencedor.dados_participacao;
      resultadoFormatado = `O poio caiu na célula [${coord.linha}, ${coord.coluna}]`;
    } else if (jogo.tipo === JogoTipo.RIFA) {
      resultadoFormatado = `O número sorteado foi o ${vencedor.dados_participacao.numero}`;
    } else if (jogo.tipo === JogoTipo.CORRIDA_CARACOIS) {
      resultadoFormatado = `O caracol vencedor foi o nº ${vencedor.dados_participacao.numero_caracol}`;
    }

    const sorteio = this.sorteiosRepository.create({
      jogoId,
      seed,
      hash,
      resultado: vencedor.dados_participacao,
    });

    const savedSorteio = await this.sorteiosRepository.save(sorteio);

    // Atualizar estado do jogo
    jogo.estado = JogoStatus.TERMINADO;
    await this.jogosRepository.save(jogo);

    // Auditoria
    await this.auditoriaService.log(
      'SORTEIO_REALIZADO',
      { jogoId, sorteioId: savedSorteio.id, vencedorId: vencedor.utilizadorId },
      utilizadorId,
      aldeiaId,
    );

    // Enviar notificações
    const jogoNome = `Jogo ${jogo.tipo}`; // Melhorar se houver nome
    await this.notificacoesService.notificarVencedor(
      vencedor.utilizador.email,
      vencedor.utilizador.nome,
      jogoNome,
      vencedor.dados_participacao,
    );

    // Emitir via WebSocket
    if (aldeiaId) {
      this.notificacoesGateway.emitJogoSorteado(aldeiaId, {
        jogoId: jogo.id,
        resultado: resultadoFormatado,
        vencedorNome: vencedor.utilizador.nome,
        dadosSorteio: savedSorteio,
      });
    }

    return savedSorteio;
  }

  async findOneByJogo(jogoId: string): Promise<Sorteio> {
    const s = await this.sorteiosRepository.findOne({
      where: { jogoId },
      relations: ['jogo'],
    });
    if (!s)
      throw new NotFoundException('Sorteio não encontrado para este jogo');
    return s;
  }
}
