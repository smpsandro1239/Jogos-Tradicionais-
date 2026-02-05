import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Aldeia } from '../aldeias/aldeia.entity';
import { Participacao } from '../participacoes/participacao.entity';

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ALDEIA_ADMIN = 'aldeia_admin',
  USER = 'user',
}

@Entity('utilizadores')
export class Utilizador {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  nome: string;

  @OneToMany(() => Participacao, (participacao) => participacao.utilizador)
  participacoes: Participacao[];

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @Column()
  password_hash: string;

  @ApiProperty({ enum: UserRole })
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @ApiProperty({ type: () => Aldeia, required: false })
  @ManyToOne(() => Aldeia, { nullable: true })
  aldeia: Aldeia;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  push_token: string;
}
