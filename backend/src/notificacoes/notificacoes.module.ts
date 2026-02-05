import { Module, Global } from '@nestjs/common';
import { NotificacoesService } from './notificacoes.service';
import { NotificacoesGateway } from './notificacoes.gateway';

@Global()
@Module({
  providers: [NotificacoesService, NotificacoesGateway],
  exports: [NotificacoesService, NotificacoesGateway],
})
export class NotificacoesModule {}
