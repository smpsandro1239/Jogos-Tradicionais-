import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, Unique } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Jogo } from '../jogos/jogo.entity';
import { Utilizador } from '../utilizadores/utilizador.entity';

export enum ParticipacaoStatus {
  PENDENTE = 'pendente',
  PAGO = 'pago',
  CANCELADO = 'cancelado',
}

@Entity('participacoes')
@Unique(['jogoId', 'dados_participacao'])
export class Participacao {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: () => Jogo })
  @ManyToOne(() => Jogo, { onDelete: 'CASCADE' })
  jogo: Jogo;

  @ApiProperty()
  @Column()
  jogoId: string;

  @ApiProperty({ type: () => Utilizador })
  @ManyToOne(() => Utilizador, { onDelete: 'CASCADE' })
  utilizador: Utilizador;

  @ApiProperty()
  @Column()
  utilizadorId: string;

  @ApiProperty({ description: 'Dados específicos da participação (ex: {linha: 1, coluna: 2} ou {numero: 5})' })
  @Column({ type: 'jsonb' })
  dados_participacao: any;

  @ApiProperty()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor_pago: number;

  @ApiProperty({ enum: ParticipacaoStatus })
  @Column({
    type: 'enum',
    enum: ParticipacaoStatus,
    default: ParticipacaoStatus.PENDENTE,
  })
  status: ParticipacaoStatus;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;
}
