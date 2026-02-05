import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { SorteiosService } from './sorteios.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../utilizadores/utilizador.entity';

@ApiTags('Sorteios')
@Controller('sorteios')
export class SorteiosController {
  constructor(private readonly sorteiosService: SorteiosService) {}

  @Post(':jogoId')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ALDEIA_ADMIN, UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Realizar o sorteio de um jogo (Admin)' })
  @ApiResponse({ status: 201, description: 'Sorteio realizado com sucesso' })
  realizarSorteio(@Param('jogoId') jogoId: string, @Request() req) {
    return this.sorteiosService.realizarSorteio(
      jogoId,
      req.user.id,
      req.user.aldeiaId,
    );
  }

  @Get(':jogoId')
  @ApiOperation({
    summary: 'Consultar o resultado e auditoria de um sorteio (Público)',
  })
  @ApiResponse({ status: 200, description: 'Dados do sorteio retornados' })
  getSorteio(@Param('jogoId') jogoId: string) {
    return this.sorteiosService.findOneByJogo(jogoId);
  }
}
