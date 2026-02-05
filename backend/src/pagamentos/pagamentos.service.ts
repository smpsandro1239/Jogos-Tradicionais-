import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Participacao,
  ParticipacaoStatus,
} from '../participacoes/participacao.entity';
import { AuditoriaService } from '../auditoria/auditoria.service';

@Injectable()
export class PagamentosService {
  private readonly logger = new Logger(PagamentosService.name);

  constructor(
    @InjectRepository(Participacao)
    private readonly participacoesRepository: Repository<Participacao>,
    private readonly auditoriaService: AuditoriaService,
  ) {}

  async processarConfirmacao(participacaoId: string, transactionId: string) {
    const participacao = await this.participacoesRepository.findOne({
      where: { id: participacaoId },
      relations: ['jogo', 'jogo.evento'],
    });

    if (!participacao) {
      throw new NotFoundException(
        `Participação ${participacaoId} não encontrada`,
      );
    }

    if (participacao.status === ParticipacaoStatus.PAGO) {
      this.logger.warn(`Participação ${participacaoId} já está paga.`);
      return participacao;
    }

    participacao.status = ParticipacaoStatus.PAGO;
    const participacaoSalva =
      await this.participacoesRepository.save(participacao);

    // Registar na auditoria
    await this.auditoriaService.log(
      'PAGAMENTO_CONFIRMADO',
      { participacaoId, transactionId, valor: participacao.valor_pago },
      participacao.utilizadorId,
      participacao.jogo.evento
        ? (participacao.jogo.evento as any).aldeiaId
        : undefined,
    );

    this.logger.log(
      `Pagamento confirmado para a participação ${participacaoId}. ID Transação: ${transactionId}`,
    );

    return participacaoSalva;
  }

  async cancelarParticipacao(participacaoId: string, motivo: string) {
    const participacao = await this.participacoesRepository.findOne({
      where: { id: participacaoId },
    });

    if (!participacao) {
      throw new NotFoundException(
        `Participação ${participacaoId} não encontrada`,
      );
    }

    participacao.status = ParticipacaoStatus.CANCELADO;
    const participacaoSalva =
      await this.participacoesRepository.save(participacao);

    await this.auditoriaService.log(
      'PARTICIPACAO_CANCELADA',
      { participacaoId, motivo },
      participacao.utilizadorId,
    );

    return participacaoSalva;
  }
}
