import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilizadoresService } from './utilizadores.service';
import { UtilizadoresController } from './utilizadores.controller';
import { Utilizador } from './utilizador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Utilizador])],
  providers: [UtilizadoresService],
  controllers: [UtilizadoresController],
  exports: [UtilizadoresService],
})
export class UtilizadoresModule {}
