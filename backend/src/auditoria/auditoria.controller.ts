import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuditoriaService } from './auditoria.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../utilizadores/utilizador.entity';

@ApiTags('Auditoria')
@ApiBearerAuth()
@Controller('auditoria')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AuditoriaController {
  constructor(private readonly auditoriaService: AuditoriaService) {}

  @Get()
  @Roles(UserRole.SUPER_ADMIN, UserRole.ALDEIA_ADMIN)
  @ApiOperation({ summary: 'Listar logs de auditoria (Admin)' })
  findAll(@Query('aldeiaId') aldeiaId?: string) {
    return this.auditoriaService.findAll(aldeiaId);
  }
}
