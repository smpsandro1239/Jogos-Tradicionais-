import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AldeiasService } from './aldeias.service';
import { AldeiasController } from './aldeias.controller';
import { Aldeia } from './aldeia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Aldeia])],
  providers: [AldeiasService],
  controllers: [AldeiasController],
  exports: [AldeiasService],
})
export class AldeiasModule {}
