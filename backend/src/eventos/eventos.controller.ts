import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { EventosService } from './eventos.service';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { AldeiaGuard } from '../common/guards/aldeia.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../utilizadores/utilizador.entity';

@ApiTags('Eventos')
@ApiBearerAuth()
@Controller('eventos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EventosController {
  constructor(private readonly eventosService: EventosService) {}

  @Post()
  @Roles(UserRole.ALDEIA_ADMIN, UserRole.SUPER_ADMIN)
  @UseGuards(AldeiaGuard)
  @ApiOperation({ summary: 'Criar um novo evento' })
  @ApiResponse({ status: 201, description: 'Evento criado com sucesso' })
  create(@Body() createEventoDto: CreateEventoDto) {
    return this.eventosService.create(createEventoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os eventos' })
  findAll(@Query('aldeiaId') aldeiaId?: string) {
    return this.eventosService.findAll(aldeiaId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um evento pelo ID' })
  findOne(@Param('id') id: string) {
    return this.eventosService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ALDEIA_ADMIN, UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Atualizar um evento' })
  async update(
    @Param('id') id: string,
    @Body() updateEventoDto: UpdateEventoDto,
    @Request() req,
  ) {
    const userAldeiaId =
      req.user.role === UserRole.ALDEIA_ADMIN ? req.user.aldeiaId : undefined;
    return this.eventosService.update(id, updateEventoDto, userAldeiaId);
  }

  @Delete(':id')
  @Roles(UserRole.ALDEIA_ADMIN, UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Eliminar um evento' })
  remove(@Param('id') id: string, @Request() req) {
    const userAldeiaId =
      req.user.role === UserRole.ALDEIA_ADMIN ? req.user.aldeiaId : undefined;
    return this.eventosService.remove(id, userAldeiaId);
  }
}
