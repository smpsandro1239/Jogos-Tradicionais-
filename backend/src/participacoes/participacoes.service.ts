import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Participacao } from './participacao.entity';
import { CreateParticipacaoDto } from './dto/create-participacao.dto';
import { JogosService } from '../jogos/jogos.service';
import { JogoTipo, JogoStatus } from '../jogos/jogo.entity';

@Injectable()
export class ParticipacoesService {
  constructor(
    @InjectRepository(Participacao)
    private readonly participacoesRepository: Repository<Participacao>,
    private readonly jogosService: JogosService,
  ) {}

  async create(createParticipacaoDto: CreateParticipacaoDto, utilizadorId: string): Promise<Participacao> {
    const jogo = await this.jogosService.findOne(createParticipacaoDto.jogoId);

    if (jogo.estado !== JogoStatus.ATIVO) {
      throw new BadRequestException('Não é possível participar num jogo que não está ativo');
    }

    // Validar regras de negócio baseadas no tipo de jogo
    this.validarRegrasJogo(jogo.tipo, jogo.config, createParticipacaoDto.dados_participacao);

    // Verificar se já existe participação com os mesmos dados para este jogo
    const existe = await this.participacoesRepository.findOne({
      where: {
        jogoId: jogo.id,
        dados_participacao: createParticipacaoDto.dados_participacao,
      },
    });

    if (existe) {
      throw new ConflictException('Esta coordenada ou número já foi escolhido');
    }

    const participacao = this.participacoesRepository.create({
      ...createParticipacaoDto,
      utilizadorId,
    });

    try {
      return await this.participacoesRepository.save(participacao);
    } catch (error) {
      if (error.code === '23505') { // Unique violation
        throw new ConflictException('Esta participação já existe');
      }
      throw error;
    }
  }

  private validarRegrasJogo(tipo: JogoTipo, config: any, dados: any) {
    if (tipo === JogoTipo.POIO_VACA) {
      if (!dados.linha || !dados.coluna) {
        throw new BadRequestException('Dados de participação inválidos para Poio da Vaca (requer linha e coluna)');
      }
      if (dados.linha < 1 || dados.linha > config.linhas || dados.coluna < 1 || dados.coluna > config.colunas) {
        throw new BadRequestException(`Coordenadas fora dos limites da grelha (${config.linhas}x${config.colunas})`);
      }
    } else if (tipo === JogoTipo.RIFA) {
      if (!dados.numero) {
        throw new BadRequestException('Dados de participação inválidos para Rifa (requer número)');
      }
      if (dados.numero < 1 || dados.numero > config.total_bilhetes) {
        throw new BadRequestException(`Número fora dos limites da rifa (1-${config.total_bilhetes})`);
      }
    }
  }

  async findAll(jogoId?: string): Promise<Participacao[]> {
    if (jogoId) {
      return await this.participacoesRepository.find({
        where: { jogoId },
        relations: ['utilizador'],
      });
    }
    return await this.participacoesRepository.find({ relations: ['utilizador', 'jogo'] });
  }

  async findByUser(utilizadorId: string): Promise<Participacao[]> {
    return await this.participacoesRepository.find({
      where: { utilizadorId },
      relations: ['jogo'],
    });
  }

  async findOne(id: string): Promise<Participacao> {
    const participacao = await this.participacoesRepository.findOne({
      where: { id },
      relations: ['utilizador', 'jogo'],
    });
    if (!participacao) {
      throw new NotFoundException(`Participação com ID "${id}" não encontrada`);
    }
    return participacao;
  }
}
