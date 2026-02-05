import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Evento } from '../eventos/evento.entity';
import { Participacao } from '../participacoes/participacao.entity';
import { Sorteio } from '../sorteios/sorteio.entity';

export enum JogoTipo {
  POIO_VACA = 'poio_vaca',
  RIFA = 'rifa',
  CORRIDA_CARACOIS = 'corrida_caracois',
}

export enum JogoStatus {
  ATIVO = 'ativo',
  PAUSADO = 'pausado',
  FECHADO = 'fechado',
  TERMINADO = 'terminado',
}

@Entity('jogos')
export class Jogo {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ enum: JogoTipo })
  @Column({
    type: 'enum',
    enum: JogoTipo,
  })
  tipo: JogoTipo;

  @ApiProperty()
  @Column({ type: 'jsonb' })
  config: any;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  preco_participacao: number;

  @ApiProperty({ enum: JogoStatus })
  @Column({
    type: 'enum',
    enum: JogoStatus,
    default: JogoStatus.ATIVO,
  })
  estado: JogoStatus;

  @ApiProperty({ type: () => Evento })
  @ManyToOne(() => Evento, { onDelete: 'CASCADE' })
  evento: Evento;

  @ApiProperty()
  @Column()
  eventoId: string;

  @OneToMany(() => Participacao, (participacao) => participacao.jogo)
  participacoes: Participacao[];

  @ApiProperty({ type: () => Sorteio })
  @OneToOne(() => Sorteio, (sorteio) => sorteio.jogo)
  sorteio: Sorteio;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}
