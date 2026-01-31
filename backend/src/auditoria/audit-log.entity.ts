import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('audit_logs')
export class AuditLog {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  acao: string;

  @ApiProperty({ required: false })
  @Column({ type: 'jsonb', nullable: true })
  detalhes: any;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  utilizadorId: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  aldeiaId: string;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;
}
