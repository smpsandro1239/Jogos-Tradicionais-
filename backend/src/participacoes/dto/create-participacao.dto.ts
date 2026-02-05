import { IsNotEmpty, IsObject, IsUUID, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateParticipacaoDto {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  jogoId: string;

  @ApiProperty({
    description:
      'Dados da participação (ex: {linha: 1, coluna: 2} ou {numero: 5})',
  })
  @IsObject()
  @IsNotEmpty()
  dados_participacao: any;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  valor_pago: number;
}
