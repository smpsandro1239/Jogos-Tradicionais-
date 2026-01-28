import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Aldeia } from '../aldeias/aldeia.entity';

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
}
