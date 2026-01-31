import { Controller, Get, Post, Body, Param, UseGuards, Query, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ParticipacoesService } from './participacoes.service';
import { CreateParticipacaoDto } from './dto/create-participacao.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../utilizadores/utilizador.entity';

@ApiTags('Participações')
@ApiBearerAuth()
@Controller('participacoes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ParticipacoesController {
  constructor(private readonly participacoesService: ParticipacoesService) {}

  @Post()
  @Roles(UserRole.USER, UserRole.ALDEIA_ADMIN, UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Comprar uma participação num jogo' })
  @ApiResponse({ status: 201, description: 'Participação registada com sucesso' })
  create(@Body() createParticipacaoDto: CreateParticipacaoDto, @Request() req) {
    return this.participacoesService.create(createParticipacaoDto, req.user.id);
  }

  @Get()
  @Roles(UserRole.ALDEIA_ADMIN, UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Listar todas as participações (Admin)' })
  findAll(@Query('jogoId') jogoId?: string) {
    return this.participacoesService.findAll(jogoId);
  }

  @Get('me')
  @Roles(UserRole.USER, UserRole.ALDEIA_ADMIN, UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Listar as minhas participações' })
  findMyParticipations(@Request() req) {
    return this.participacoesService.findByUser(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter uma participação pelo ID' })
  findOne(@Param('id') id: string) {
    return this.participacoesService.findOne(id);
  }
}
