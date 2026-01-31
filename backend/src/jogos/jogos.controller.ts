import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JogosService } from './jogos.service';
import { CreateJogoDto } from './dto/create-jogo.dto';
import { UpdateJogoDto } from './dto/update-jogo.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../utilizadores/utilizador.entity';

@ApiTags('Jogos')
@Controller('jogos')
export class JogosController {
  constructor(private readonly jogosService: JogosService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ALDEIA_ADMIN, UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Criar um novo jogo' })
  @ApiResponse({ status: 201, description: 'Jogo criado com sucesso' })
  create(@Body() createJogoDto: CreateJogoDto) {
    return this.jogosService.create(createJogoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os jogos (Público)' })
  findAll(@Query('eventoId') eventoId?: string) {
    return this.jogosService.findAll(eventoId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um jogo pelo ID (Público)' })
  findOne(@Param('id') id: string) {
    return this.jogosService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ALDEIA_ADMIN, UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Atualizar um jogo' })
  update(@Param('id') id: string, @Body() updateJogoDto: UpdateJogoDto, @Request() req) {
    return this.jogosService.update(id, updateJogoDto, req.user.id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ALDEIA_ADMIN, UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Eliminar um jogo' })
  remove(@Param('id') id: string) {
    return this.jogosService.remove(id);
  }
}
