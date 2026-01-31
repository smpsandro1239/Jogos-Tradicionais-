import { IsString, IsNotEmpty, IsOptional, IsEnum, IsNumber, IsJSON, IsObject, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { JogoTipo, JogoStatus } from '../jogo.entity';

export class CreateJogoDto {
  @ApiProperty({ enum: JogoTipo })
  @IsEnum(JogoTipo)
  @IsNotEmpty()
  tipo: JogoTipo;

  @ApiProperty({ description: 'Configuração do jogo (linhas/colunas para Poio da Vaca, total de bilhetes para Rifa)' })
  @IsObject()
  @IsNotEmpty()
  config: any;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  preco_participacao: number;

  @ApiProperty({ enum: JogoStatus, required: false })
  @IsEnum(JogoStatus)
  @IsOptional()
  estado?: JogoStatus;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  eventoId: string;
}
