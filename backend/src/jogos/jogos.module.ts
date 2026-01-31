import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JogosService } from './jogos.service';
import { JogosController } from './jogos.controller';
import { Jogo } from './jogo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Jogo])],
  controllers: [JogosController],
  providers: [JogosService],
  exports: [JogosService],
})
export class JogosModule {}
