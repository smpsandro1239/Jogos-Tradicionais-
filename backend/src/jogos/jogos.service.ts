import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Jogo, JogoTipo } from './jogo.entity';
import { CreateJogoDto } from './dto/create-jogo.dto';
import { UpdateJogoDto } from './dto/update-jogo.dto';

@Injectable()
export class JogosService {
  constructor(
    @InjectRepository(Jogo)
    private readonly jogosRepository: Repository<Jogo>,
  ) {}

  private validateConfig(tipo: JogoTipo, config: any) {
    if (tipo === JogoTipo.POIO_VACA) {
      if (!config.linhas || !config.colunas) {
        throw new BadRequestException('Configuração do Poio da Vaca deve incluir "linhas" e "colunas"');
      }
    } else if (tipo === JogoTipo.RIFA) {
      if (!config.total_bilhetes) {
        throw new BadRequestException('Configuração da Rifa deve incluir "total_bilhetes"');
      }
    }
  }

  async create(createJogoDto: CreateJogoDto): Promise<Jogo> {
    this.validateConfig(createJogoDto.tipo, createJogoDto.config);
    const jogo = this.jogosRepository.create(createJogoDto);
    return await this.jogosRepository.save(jogo);
  }

  async findAll(eventoId?: string): Promise<Jogo[]> {
    if (eventoId) {
      return await this.jogosRepository.find({ where: { eventoId } });
    }
    return await this.jogosRepository.find();
  }

  async findOne(id: string): Promise<Jogo> {
    const jogo = await this.jogosRepository.findOne({ where: { id }, relations: ['evento'] });
    if (!jogo) {
      throw new NotFoundException(`Jogo com ID "${id}" não encontrado`);
    }
    return jogo;
  }

  async update(id: string, updateJogoDto: UpdateJogoDto): Promise<Jogo> {
    const jogo = await this.findOne(id);

    if (updateJogoDto.tipo || updateJogoDto.config) {
      const tipo = updateJogoDto.tipo || jogo.tipo;
      const config = updateJogoDto.config || jogo.config;
      this.validateConfig(tipo, config);
    }

    Object.assign(jogo, updateJogoDto);
    return await this.jogosRepository.save(jogo);
  }

  async remove(id: string): Promise<void> {
    const result = await this.jogosRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Jogo com ID "${id}" não encontrado`);
    }
  }
}
