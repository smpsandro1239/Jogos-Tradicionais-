import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evento } from './evento.entity';
import { CreateEventoDto } from './dto/create-evento.dto';
import { UpdateEventoDto } from './dto/update-evento.dto';

@Injectable()
export class EventosService {
  constructor(
    @InjectRepository(Evento)
    private readonly eventosRepository: Repository<Evento>,
  ) {}

  async create(createEventoDto: CreateEventoDto): Promise<Evento> {
    const evento = this.eventosRepository.create({
      ...createEventoDto,
      data_inicio: new Date(createEventoDto.data_inicio),
      data_fim: createEventoDto.data_fim ? new Date(createEventoDto.data_fim) : undefined,
    } as any) as unknown as Evento;
    return await this.eventosRepository.save(evento);
  }

  async findAll(aldeiaId?: string): Promise<Evento[]> {
    if (aldeiaId) {
      return await this.eventosRepository.find({
        where: { aldeiaId },
        order: { data_inicio: 'DESC' },
      });
    }
    return await this.eventosRepository.find({
      order: { data_inicio: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Evento> {
    const evento = await this.eventosRepository.findOne({ where: { id } });
    if (!evento) {
      throw new NotFoundException(`Evento com ID "${id}" não encontrado`);
    }
    return evento;
  }

  async update(id: string, updateEventoDto: UpdateEventoDto, userAldeiaId?: string): Promise<Evento> {
    const evento = await this.findOne(id);

    if (userAldeiaId && evento.aldeiaId !== userAldeiaId) {
      throw new ForbiddenException('Não tem permissão para alterar este evento');
    }

    const updateData = { ...updateEventoDto };

    if (updateData.data_inicio) {
      (updateData as any).data_inicio = new Date(updateData.data_inicio);
    }
    if (updateData.data_fim) {
      (updateData as any).data_fim = new Date(updateData.data_fim);
    }

    Object.assign(evento, updateData);
    return await this.eventosRepository.save(evento);
  }

  async remove(id: string, userAldeiaId?: string): Promise<void> {
    const evento = await this.findOne(id);

    if (userAldeiaId && evento.aldeiaId !== userAldeiaId) {
      throw new ForbiddenException('Não tem permissão para eliminar este evento');
    }

    await this.eventosRepository.remove(evento);
  }
}
