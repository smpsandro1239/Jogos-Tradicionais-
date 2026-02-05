import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificacoesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('NotificacoesGateway');

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join_aldeia')
  handleJoinAldeia(client: Socket, aldeiaId: string) {
    client.join(`aldeia_${aldeiaId}`);
    this.logger.log(`Client ${client.id} joined room: aldeia_${aldeiaId}`);
  }

  emitJogoSorteado(aldeiaId: string, payload: any) {
    this.server.to(`aldeia_${aldeiaId}`).emit('jogo_sorteado', payload);
  }

  emitNovaParticipacao(aldeiaId: string, payload: any) {
    this.server.to(`aldeia_${aldeiaId}`).emit('nova_participacao', payload);
  }
}
