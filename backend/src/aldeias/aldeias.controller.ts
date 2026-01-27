import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AldeiasService } from './aldeias.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../utilizadores/utilizador.entity';
import { CreateAldeiaDto } from './dto/create-aldeia.dto';
import { UpdateAldeiaDto } from './dto/update-aldeia.dto';

@ApiTags('Aldeias')
@ApiBearerAuth()
@Controller('aldeias')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AldeiasController {
  constructor(private readonly aldeiasService: AldeiasService) {}

  @Get()
  @ApiOperation({ summary: 'Get all villages' })
  findAll() {
    return this.aldeiasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a village by id' })
  findOne(@Param('id') id: string) {
    return this.aldeiasService.findOne(id);
  }

  @Post()
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Create a new village' })
  @ApiResponse({ status: 201, description: 'Village successfully created' })
  create(@Body() dto: CreateAldeiaDto) {
    return this.aldeiasService.create(dto);
  }

  @Patch(':id')
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Update a village' })
  update(@Param('id') id: string, @Body() dto: UpdateAldeiaDto) {
    return this.aldeiasService.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.SUPER_ADMIN)
  @ApiOperation({ summary: 'Delete a village' })
  remove(@Param('id') id: string) {
    return this.aldeiasService.remove(id);
  }
}
