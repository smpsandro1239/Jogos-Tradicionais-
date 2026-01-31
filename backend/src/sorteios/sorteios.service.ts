import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sorteio } from './sorteio.entity';
import { JogosService } from '../jogos/jogos.service';
import { JogoStatus, JogoTipo } from '../jogos/jogo.entity';
import * as crypto from 'crypto';

@Injectable()
export class SorteiosService {
  constructor(
    @InjectRepository(Sorteio)
    private readonly sorteiosRepository: Repository<Sorteio>,
    private readonly jogosService: JogosService,
  ) {}

  async realizarSorteio(jogoId: string): Promise<Sorteio> {
    const jogo = await this.jogosService.findOne(jogoId);

    if (jogo.estado === JogoStatus.TERMINADO) {
      throw new ConflictException('O sorteio para este jogo já foi realizado');
    }

    // Gerar seed e hash
    const seed = crypto.randomBytes(32).toString('hex') + Date.now();
    const hash = crypto.createHash('sha256').update(seed).digest('hex');

    // Calcular resultado
    const resultado = this.calcularResultado(jogo.tipo, jogo.config, hash);

    const sorteio = this.sorteiosRepository.create({
      jogoId,
      seed,
      hash,
      resultado,
    });

    const sorteioSalvo = await this.sorteiosRepository.save(sorteio);

    // Atualizar estado do jogo
    await this.jogosService.update(jogoId, { estado: JogoStatus.TERMINADO });

    return sorteioSalvo;
  }

  private calcularResultado(tipo: JogoTipo, config: any, hash: string): any {
    // Usar os primeiros 8 caracteres do hash para obter um número inteiro grande
    const intValue = parseInt(hash.substring(0, 8), 16);

    if (tipo === JogoTipo.RIFA) {
      const total = config.total_bilhetes;
      const numeroVencedor = (intValue % total) + 1;
      return { numero: numeroVencedor };
    } else if (tipo === JogoTipo.POIO_VACA) {
      const rows = config.linhas;
      const cols = config.colunas;
      const totalSquares = rows * cols;
      const index = intValue % totalSquares;

      const linha = Math.floor(index / cols) + 1;
      const coluna = (index % cols) + 1;

      return { linha, coluna };
    }

    throw new BadRequestException('Tipo de jogo desconhecido para sorteio');
  }

  async findOneByJogo(jogoId: string): Promise<Sorteio> {
    const sorteio = await this.sorteiosRepository.findOne({ where: { jogoId } });
    if (!sorteio) {
      throw new NotFoundException(`Sorteio para o jogo "${jogoId}" não encontrado`);
    }
    return sorteio;
  }
}
