import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NotificacoesService {
  private readonly logger = new Logger(NotificacoesService.name);

  async enviarEmail(para: string, assunto: string, corpo: string) {
    // Simulação de envio de email
    this.logger.log(`Enviando Email para ${para}: [${assunto}] ${corpo}`);
    return true;
  }

  async enviarPush(token: string, titulo: string, mensagem: string) {
    // Simulação de envio de notificação push
    this.logger.log(`Enviando Push para ${token}: [${titulo}] ${mensagem}`);
    return true;
  }

  async notificarVencedor(email: string, nome: string, jogoNome: string, resultado: any) {
    const assunto = `Parabéns! Ganhaste no jogo ${jogoNome}`;
    const corpo = `Olá ${nome}, as tuas coordenadas/número foram as vencedoras: ${JSON.stringify(resultado)}. Entra em contacto com a organização!`;
    return this.enviarEmail(email, assunto, corpo);
  }

  async notificarSorteioRealizado(participantesEmails: string[], jogoNome: string) {
    const assunto = `Sorteio Realizado: ${jogoNome}`;
    const corpo = `O sorteio do jogo ${jogoNome} já foi realizado. Consulta os resultados na aplicação!`;

    for (const email of participantesEmails) {
      await this.enviarEmail(email, assunto, corpo);
    }
    return true;
  }
}
