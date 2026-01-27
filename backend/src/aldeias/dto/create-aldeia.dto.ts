import { IsString, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAldeiaDto {
  @ApiProperty()
  @IsString()
  nome: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  descricao?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  localizacao?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  logo_url?: string;
}
