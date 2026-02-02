import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SorteiosService } from './sorteios.service';
import { SorteiosController } from './sorteios.controller';
import { Sorteio } from './sorteio.entity';
import { JogosModule } from '../jogos/jogos.module';
import { ParticipacoesModule } from '../participacoes/participacoes.module';
import { NotificacoesModule } from '../notificacoes/notificacoes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sorteio]),
    JogosModule,
    ParticipacoesModule,
    NotificacoesModule,
  ],
  controllers: [SorteiosController],
  providers: [SorteiosService],
  exports: [SorteiosService],
})
export class SorteiosModule {}
