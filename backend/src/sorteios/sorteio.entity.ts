import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Jogo } from '../jogos/jogo.entity';

@Entity('sorteios')
export class Sorteio {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  seed: string;

  @ApiProperty()
  @Column()
  hash: string;

  @ApiProperty({
    description:
      'Resultado do sorteio (ex: {linha: 5, coluna: 3} ou {numero: 42})',
  })
  @Column({ type: 'jsonb' })
  resultado: any;

  @OneToOne(() => Jogo, (jogo) => jogo.sorteio, { onDelete: 'CASCADE' })
  @JoinColumn()
  jogo: Jogo;

  @ApiProperty()
  @Column()
  jogoId: string;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;
}
