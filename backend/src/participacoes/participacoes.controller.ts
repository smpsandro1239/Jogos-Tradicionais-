import { Controller, Get, Post, Body, Param, UseGuards, Query, Request, Res, ForbiddenException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ParticipacoesService } from './participacoes.service';
import { JogosService } from '../jogos/jogos.service';
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
  constructor(
    private readonly participacoesService: ParticipacoesService,
    private readonly jogosService: JogosService,
  ) {}

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
  async findAll(@Query('jogoId') jogoId?: string, @Request() req?) {
    if (req.user.role === UserRole.ALDEIA_ADMIN) {
        if (jogoId) {
            const jogo = await this.jogosService.findOne(jogoId);
            if (jogo.evento && (jogo.evento as any).aldeiaId !== req.user.aldeiaId) {
                throw new ForbiddenException('Não tem permissão para ver as participações deste jogo');
            }
        } else {
            throw new ForbiddenException('Admin de aldeia deve especificar um jogoId para listar participações');
        }
    }
    return this.participacoesService.findAll(jogoId);
  }

  @Get('jogo/:jogoId')
  @Roles(UserRole.USER, UserRole.ALDEIA_ADMIN, UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Ver dados ocupados de um jogo (Público)' })
  async findOccupiedByJogo(@Param('jogoId') jogoId: string) {
    const participacoes = await this.participacoesService.findAll(jogoId);
    return participacoes.map(p => ({
      dados_participacao: p.dados_participacao,
      status: p.status
    }));
  }

  @Get('me')
  @Roles(UserRole.USER, UserRole.ALDEIA_ADMIN, UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Listar as minhas participações' })
  findMyParticipations(@Request() req) {
    return this.participacoesService.findByUser(req.user.id);
  }

  @Get('export/csv')
  @Roles(UserRole.ALDEIA_ADMIN, UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Exportar participações para CSV (Admin)' })
  async exportCsv(@Query('jogoId') jogoId: string, @Res() res, @Request() req) {
    if (req.user.role === UserRole.ALDEIA_ADMIN) {
        if (!jogoId) {
            throw new ForbiddenException('Admin de aldeia deve especificar um jogoId para exportar');
        }
        const jogo = await this.jogosService.findOne(jogoId);
        if (jogo.evento && (jogo.evento as any).aldeiaId !== req.user.aldeiaId) {
            throw new ForbiddenException('Não tem permissão para exportar as participações deste jogo');
        }
    }

    const participacoes = await this.participacoesService.findAll(jogoId);

    let csv = 'ID,Utilizador,Email,Dados,Valor Pago,Data\n';
    participacoes.forEach(p => {
      const nome = `"${p.utilizador.nome.replace(/"/g, '""')}"`;
      const email = `"${p.utilizador.email.replace(/"/g, '""')}"`;
      const dadosStr = `"${JSON.stringify(p.dados_participacao).replace(/"/g, '""')}"`;

      csv += `${p.id},${nome},${email},${dadosStr},${p.valor_pago},${p.created_at.toISOString()}\n`;
    });

    res.header('Content-Type', 'text/csv; charset=utf-8');
    res.attachment(`participacoes_${jogoId || 'todas'}.csv`);
    return res.send(csv);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter uma participação pelo ID' })
  findOne(@Param('id') id: string) {
    return this.participacoesService.findOne(id);
  }
}
