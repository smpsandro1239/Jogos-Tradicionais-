import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SorteiosService } from './sorteios.service';
import { SorteiosController } from './sorteios.controller';
import { Sorteio } from './sorteio.entity';
import { JogosModule } from '../jogos/jogos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sorteio]),
    JogosModule,
  ],
  controllers: [SorteiosController],
  providers: [SorteiosService],
  exports: [SorteiosService],
})
export class SorteiosModule {}
