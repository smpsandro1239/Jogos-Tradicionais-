import { Controller, Get, Param, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { EstatisticasService } from './estatisticas.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { AldeiaGuard } from '../common/guards/aldeia.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../utilizadores/utilizador.entity';
import { EventosService } from '../eventos/eventos.service';

@ApiTags('Estatísticas')
@ApiBearerAuth()
@Controller('estatisticas')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EstatisticasController {
  constructor(
    private readonly estatisticasService: EstatisticasService,
    private readonly eventosService: EventosService,
  ) {}

  @Get('aldeia/:aldeiaId')
  @Roles(UserRole.ALDEIA_ADMIN, UserRole.SUPER_ADMIN)
  @UseGuards(AldeiaGuard)
  @ApiOperation({ summary: 'Obter estatísticas globais da aldeia' })
  getGlobal(@Param('aldeiaId') aldeiaId: string) {
    return this.estatisticasService.getGlobalPorAldeia(aldeiaId);
  }

  @Get('aldeia/:aldeiaId/eventos')
  @Roles(UserRole.ALDEIA_ADMIN, UserRole.SUPER_ADMIN)
  @UseGuards(AldeiaGuard)
  @ApiOperation({ summary: 'Obter estatísticas de todos os eventos da aldeia' })
  getEventos(@Param('aldeiaId') aldeiaId: string) {
    return this.estatisticasService.getEventosStats(aldeiaId);
  }

  @Get('evento/:eventoId')
  @Roles(UserRole.ALDEIA_ADMIN, UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Obter estatísticas de um evento específico' })
  async getEvento(@Param('eventoId') eventoId: string, @Request() req) {
    if (req.user.role === UserRole.SUPER_ADMIN) {
        return this.estatisticasService.getPorEvento(eventoId);
    }

    // Validar se o evento pertence à aldeia do administrador
    const evento = await this.eventosService.findOne(eventoId);
    if (evento.aldeiaId !== req.user.aldeiaId) {
        throw new ForbiddenException('Não tem permissão para aceder a estatísticas deste evento');
    }

    return this.estatisticasService.getPorEvento(eventoId);
  }
}
