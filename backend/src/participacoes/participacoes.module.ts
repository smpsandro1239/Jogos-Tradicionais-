import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipacoesService } from './participacoes.service';
import { ParticipacoesController } from './participacoes.controller';
import { Participacao } from './participacao.entity';
import { JogosModule } from '../jogos/jogos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Participacao]), JogosModule],
  controllers: [ParticipacoesController],
  providers: [ParticipacoesService],
  exports: [ParticipacoesService],
})
export class ParticipacoesModule {}
