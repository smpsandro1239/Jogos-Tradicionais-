import { PartialType } from '@nestjs/mapped-types';
import { CreateAldeiaDto } from './create-aldeia.dto';

export class UpdateAldeiaDto extends PartialType(CreateAldeiaDto) {}
