import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstatisticasService } from './estatisticas.service';
import { EstatisticasController } from './estatisticas.controller';
import { Participacao } from '../participacoes/participacao.entity';
import { Evento } from '../eventos/evento.entity';
import { EventosModule } from '../eventos/eventos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Participacao, Evento]), EventosModule],
  controllers: [EstatisticasController],
  providers: [EstatisticasService],
})
export class EstatisticasModule {}
