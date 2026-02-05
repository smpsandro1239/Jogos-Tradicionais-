import { Controller, Get, Body, Patch, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UtilizadoresService } from './utilizadores.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole, Utilizador } from './utilizador.entity';

@ApiTags('Utilizadores')
@ApiBearerAuth()
@Controller('utilizadores')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UtilizadoresController {
  constructor(private readonly utilizadoresService: UtilizadoresService) {}

  @Get()
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Listar todos os utilizadores (Super Admin)' })
  findAll() {
    return this.utilizadoresService.findAll();
  }

  @Patch('push-token')
  @Roles(UserRole.USER, UserRole.ALDEIA_ADMIN, UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Atualizar o push token do utilizador autenticado' })
  updatePushToken(@Request() req, @Body('pushToken') pushToken: string) {
    return this.utilizadoresService.updatePushToken(req.user.id, pushToken);
  }

  @Patch(':id')
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Atualizar um utilizador (Super Admin)' })
  update(@Param('id') id: string, @Body() data: Partial<Utilizador>) {
    return this.utilizadoresService.update(id, data);
  }
}
