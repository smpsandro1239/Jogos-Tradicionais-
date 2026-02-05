import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Utilizador } from './utilizador.entity';

@Injectable()
export class UtilizadoresService {
  constructor(
    @InjectRepository(Utilizador)
    private readonly repo: Repository<Utilizador>,
  ) {}

  async create(data: Partial<Utilizador>): Promise<Utilizador> {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }

  async findAll(): Promise<Utilizador[]> {
    return this.repo.find({ relations: ['aldeia'] });
  }

  async findByEmail(email: string): Promise<Utilizador | null> {
    return this.repo.findOne({ where: { email }, relations: ['aldeia'] });
  }

  async findById(id: string): Promise<Utilizador | null> {
    return this.repo.findOne({ where: { id }, relations: ['aldeia'] });
  }

  async update(id: string, data: Partial<Utilizador>): Promise<Utilizador> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException(`Utilizador com ID "${id}" não encontrado`);
    }
    Object.assign(user, data);
    return this.repo.save(user);
  }
}
