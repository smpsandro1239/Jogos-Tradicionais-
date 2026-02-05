import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Aldeia } from '../aldeias/aldeia.entity';
import { Jogo } from '../jogos/jogo.entity';

export enum EventoStatus {
  AGENDADO = 'agendado',
  ATIVO = 'ativo',
  TERMINADO = 'terminado',
}

@Entity('eventos')
export class Evento {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  nome: string;

  @ApiProperty({ required: false })
  @Column({ type: 'text', nullable: true })
  descricao: string;

  @ApiProperty()
  @Column({ type: 'timestamp' })
  data_inicio: Date;

  @ApiProperty({ required: false })
  @Column({ type: 'timestamp', nullable: true })
  data_fim: Date;

  @ApiProperty({ enum: EventoStatus })
  @Column({
    type: 'enum',
    enum: EventoStatus,
    default: EventoStatus.AGENDADO,
  })
  estado: EventoStatus;

  @ApiProperty({ type: () => Aldeia })
  @ManyToOne(() => Aldeia, { onDelete: 'CASCADE' })
  aldeia: Aldeia;

  @ApiProperty()
  @Column()
  aldeiaId: string;

  @OneToMany(() => Jogo, (jogo) => jogo.evento)
  jogos: Jogo[];

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}
