import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Evento } from '../eventos/evento.entity';

@Entity('aldeias')
export class Aldeia {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  nome: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  descricao: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  localizacao: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  logo_url: string;

  @OneToMany(() => Evento, (evento) => evento.aldeia)
  eventos: Evento[];
}
