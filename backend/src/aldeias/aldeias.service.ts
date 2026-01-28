import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aldeia } from './aldeia.entity';
import { CreateAldeiaDto } from './dto/create-aldeia.dto';
import { UpdateAldeiaDto } from './dto/update-aldeia.dto';

@Injectable()
export class AldeiasService {
  constructor(
    @InjectRepository(Aldeia)
    private readonly repo: Repository<Aldeia>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOneBy({ id });
  }

  create(dto: CreateAldeiaDto) {
    const aldeia = this.repo.create(dto);
    return this.repo.save(aldeia);
  }

  async update(id: string, dto: UpdateAldeiaDto) {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
