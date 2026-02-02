import { IsString, IsNotEmpty, IsOptional, IsEnum, IsDateString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EventoStatus } from '../evento.entity';

export class CreateEventoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  descricao?: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  data_inicio: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  data_fim?: string;

  @ApiProperty({ enum: EventoStatus, required: false })
  @IsEnum(EventoStatus)
  @IsOptional()
  estado?: EventoStatus;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  aldeiaId: string;
}
