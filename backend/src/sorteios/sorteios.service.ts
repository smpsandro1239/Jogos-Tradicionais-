import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sorteio } from './sorteio.entity';
import { JogosService } from '../jogos/jogos.service';
import { JogoStatus, JogoTipo, Jogo } from '../jogos/jogo.entity';
import { AuditoriaService } from '../auditoria/auditoria.service';
import { NotificacoesService } from '../notificacoes/notificacoes.service';
import { ParticipacoesService } from '../participacoes/participacoes.service';
import { ParticipacaoStatus } from '../participacoes/participacao.entity';
import * as crypto from 'crypto';

@Injectable()
export class SorteiosService {
  constructor(
    @InjectRepository(Sorteio)
    private readonly sorteiosRepository: Repository<Sorteio>,
    private readonly jogosService: JogosService,
    private readonly auditoriaService: AuditoriaService,
    private readonly participacoesService: ParticipacoesService,
    private readonly notificacoesService: NotificacoesService,
  ) {}

  async realizarSorteio(jogoId: string, utilizadorId?: string, aldeiaId?: string): Promise<Sorteio> {
    const jogo = await this.jogosService.findOne(jogoId);

    if (jogo.estado === JogoStatus.TERMINADO) {
      throw new ConflictException('O sorteio para este jogo já foi realizado');
    }

    // Gerar seed e hash
    const seed = crypto.randomBytes(32).toString('hex') + Date.now();
    const hash = crypto.createHash('sha256').update(seed).digest('hex');

    // Calcular resultado
    const resultado = this.calcularResultado(jogo.tipo, jogo.config, hash);

    const sorteio = this.sorteiosRepository.create({
      jogoId,
      seed,
      hash,
      resultado,
    });

    const sorteioSalvo = await this.sorteiosRepository.save(sorteio);

    // Atualizar estado do jogo
    await this.jogosService.update(jogoId, { estado: JogoStatus.TERMINADO });

    // Notificar vencedor e participantes
    this.processarNotificacoes(jogo, resultado);

    // Registar na auditoria
    await this.auditoriaService.log(
      'SORTEIO_REALIZADO',
      { jogoId, resultado, hash },
      utilizadorId,
      aldeiaId || (jogo.evento ? (jogo.evento as any).aldeiaId : undefined),
    );

    return sorteioSalvo;
  }

  private calcularResultado(tipo: JogoTipo, config: any, hash: string): any {
    const intValue = parseInt(hash.substring(0, 8), 16);

    if (tipo === JogoTipo.RIFA) {
      const total = config.total_bilhetes;
      const numeroVencedor = (intValue % total) + 1;
      return { numero: numeroVencedor };
    } else if (tipo === JogoTipo.POIO_VACA) {
      const rows = config.linhas;
      const cols = config.colunas;
      const totalSquares = rows * cols;
      const index = intValue % totalSquares;

      const linha = Math.floor(index / cols) + 1;
      const coluna = (index % cols) + 1;

      return { linha, coluna };
    }

    throw new BadRequestException('Tipo de jogo desconhecido para sorteio');
  }

  private async processarNotificacoes(jogo: Jogo, resultado: any) {
    const participacoesPagas = await this.participacoesService.findAll(jogo.id, ParticipacaoStatus.PAGO);
    const emails = [...new Set(participacoesPagas.map(p => p.utilizador.email))];
    const pushTokens = [...new Set(participacoesPagas.map(p => p.utilizador.push_token).filter(t => t != null))];

    const vencedores = participacoesPagas.filter(p => {
      if (jogo.tipo === JogoTipo.RIFA) {
        return p.dados_participacao.numero === resultado.numero;
      } else if (jogo.tipo === JogoTipo.POIO_VACA) {
        return p.dados_participacao.linha === resultado.linha && p.dados_participacao.coluna === resultado.coluna;
      }
      return false;
    });

    for (const v of vencedores) {
      await this.notificacoesService.notificarVencedor(
        v.utilizador.email,
        v.utilizador.nome,
        jogo.tipo === JogoTipo.RIFA ? 'Rifa' : 'Poio da Vaca',
        resultado,
        v.utilizador.push_token
      );
    }

    await this.notificacoesService.notificarSorteioRealizado(emails, jogo.tipo === JogoTipo.RIFA ? 'Rifa' : 'Poio da Vaca', pushTokens);
  }

  async findOneByJogo(jogoId: string): Promise<Sorteio> {
    const sorteio = await this.sorteiosRepository.findOne({ where: { jogoId } });
    if (!sorteio) {
      throw new NotFoundException(`Sorteio para o jogo "${jogoId}" não encontrado`);
    }
    return sorteio;
  }
}
