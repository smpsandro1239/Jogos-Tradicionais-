import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Participacao } from '../participacoes/participacao.entity';
import { Evento } from '../eventos/evento.entity';

@Injectable()
export class EstatisticasService {
  constructor(
    @InjectRepository(Participacao)
    private readonly participacoesRepository: Repository<Participacao>,
    @InjectRepository(Evento)
    private readonly eventosRepository: Repository<Evento>,
  ) {}

  async getGlobalPorAldeia(aldeiaId: string) {
    const stats = await this.participacoesRepository
      .createQueryBuilder('p')
      .leftJoin('p.jogo', 'j')
      .leftJoin('j.evento', 'e')
      .select('SUM(p.valor_pago)', 'totalAngariado')
      .addSelect('COUNT(p.id)', 'totalParticipacoes')
      .where('e.aldeiaId = :aldeiaId', { aldeiaId })
      .getRawOne();

    return {
      totalAngariado: parseFloat(stats.totalAngariado || 0),
      totalParticipacoes: parseInt(stats.totalParticipacoes || 0),
    };
  }

  async getPorEvento(eventoId: string) {
    const stats = await this.participacoesRepository
      .createQueryBuilder('p')
      .leftJoin('p.jogo', 'j')
      .select('SUM(p.valor_pago)', 'totalAngariado')
      .addSelect('COUNT(p.id)', 'totalParticipacoes')
      .where('j.eventoId = :eventoId', { eventoId })
      .getRawOne();

    return {
      totalAngariado: parseFloat(stats.totalAngariado || 0),
      totalParticipacoes: parseInt(stats.totalParticipacoes || 0),
    };
  }

  async getEventosStats(aldeiaId: string) {
    const eventos = await this.eventosRepository.find({
      where: { aldeiaId },
      relations: ['jogos', 'jogos.participacoes'],
    });

    return eventos.map(e => {
      let totalAngariado = 0;
      let totalParticipacoes = 0;

      e.jogos.forEach(j => {
        totalParticipacoes += j.participacoes.length;
        j.participacoes.forEach(p => {
          totalAngariado += Number(p.valor_pago);
        });
      });

      return {
        id: e.id,
        nome: e.nome,
        estado: e.estado,
        totalAngariado,
        totalParticipacoes,
      };
    });
  }
}
