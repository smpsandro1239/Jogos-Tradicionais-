import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Participacao, ParticipacaoStatus } from './participacao.entity';
import { Jogo, JogoStatus, JogoTipo } from '../jogos/jogo.entity';
import { Utilizador } from '../utilizadores/utilizador.entity';
import { NotificacoesGateway } from '../notificacoes/notificacoes.gateway';
import { CreateParticipacaoDto } from './dto/create-participacao.dto';

@Injectable()
export class ParticipacoesService {
  constructor(
    @InjectRepository(Participacao)
    private participacoesRepository: Repository<Participacao>,
    @InjectRepository(Jogo)
    private jogosRepository: Repository<Jogo>,
    @InjectRepository(Utilizador)
    private utilizadoresRepository: Repository<Utilizador>,
    private notificacoesGateway: NotificacoesGateway,
  ) {}

  async create(
    dto: CreateParticipacaoDto,
    utilizadorId: string,
  ): Promise<Participacao> {
    const { jogoId, dados_participacao } = dto;

    const jogo = await this.jogosRepository.findOne({
      where: { id: jogoId },
      relations: ['evento'],
    });

    if (!jogo) throw new NotFoundException('Jogo não encontrado');
    if (jogo.estado !== JogoStatus.ATIVO) {
      throw new BadRequestException(
        'Este jogo não está ativo para novas participações',
      );
    }

    const utilizador = await this.utilizadoresRepository.findOne({
      where: { id: utilizadorId },
    });
    if (!utilizador) throw new NotFoundException('Utilizador não encontrado');

    // Validações específicas por tipo de jogo
    if (jogo.tipo === JogoTipo.POIO_VACA) {
      const { linha, coluna } = dados_participacao;
      if (!linha || !coluna)
        throw new BadRequestException('Coordenadas inválidas');

      const existente = await this.participacoesRepository.findOne({
        where: { jogoId: jogoId, dados_participacao: { linha, coluna } },
      });
      if (existente)
        throw new BadRequestException('Esta célula já está ocupada');
    } else if (jogo.tipo === JogoTipo.RIFA) {
      const { numero } = dados_participacao;
      if (!numero)
        throw new BadRequestException('Número da rifa não especificado');

      const existente = await this.participacoesRepository.findOne({
        where: { jogoId: jogoId, dados_participacao: { numero } },
      });
      if (existente)
        throw new BadRequestException('Este número já foi escolhido');
    }

    const participacao = this.participacoesRepository.create({
      jogoId,
      utilizadorId,
      dados_participacao,
      valor_pago: jogo.preco_participacao,
      status: ParticipacaoStatus.PENDENTE,
    });

    const saved = await this.participacoesRepository.save(participacao);

    // Emitir via WebSocket se tiver aldeiaId
    if (jogo.evento && (jogo.evento as any).aldeiaId) {
      this.notificacoesGateway.emitNovaParticipacao(
        (jogo.evento as any).aldeiaId,
        {
          jogoId: jogo.id,
          utilizadorNome: utilizador.nome,
          dados: dados_participacao,
        },
      );
    }

    return saved;
  }

  async findAll(jogoId?: string): Promise<Participacao[]> {
    if (jogoId) {
      return this.participacoesRepository.find({
        where: { jogoId },
        relations: ['utilizador'],
      });
    }
    return this.participacoesRepository.find({
      relations: ['utilizador', 'jogo'],
    });
  }

  async findByUser(utilizadorId: string): Promise<Participacao[]> {
    return this.participacoesRepository.find({
      where: { utilizadorId },
      relations: ['jogo', 'jogo.evento'],
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Participacao> {
    const p = await this.participacoesRepository.findOne({
      where: { id },
      relations: ['utilizador', 'jogo'],
    });
    if (!p) throw new NotFoundException('Participação não encontrada');
    return p;
  }
}
