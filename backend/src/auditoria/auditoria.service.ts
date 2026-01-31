import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './audit-log.entity';

@Injectable()
export class AuditoriaService {
  constructor(
    @InjectRepository(AuditLog)
    private readonly auditLogRepository: Repository<AuditLog>,
  ) {}

  async log(acao: string, detalhes: any, utilizadorId?: string, aldeiaId?: string): Promise<AuditLog> {
    const auditLog = this.auditLogRepository.create({
      acao,
      detalhes,
      utilizadorId,
      aldeiaId,
    });
    return await this.auditLogRepository.save(auditLog);
  }

  async findAll(aldeiaId?: string): Promise<AuditLog[]> {
    if (aldeiaId) {
      return await this.auditLogRepository.find({
        where: { aldeiaId },
        order: { created_at: 'DESC' },
      });
    }
    return await this.auditLogRepository.find({
      order: { created_at: 'DESC' },
    });
  }
}
