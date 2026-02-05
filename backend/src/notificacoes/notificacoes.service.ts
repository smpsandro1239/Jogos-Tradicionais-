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

  async notificarVencedor(
    email: string,
    nome: string,
    jogoNome: string,
    resultado: any,
    pushToken?: string,
  ) {
    const assunto = `Parabéns! Ganhaste no jogo ${jogoNome}`;
    const corpo = `Olá ${nome}, as tuas coordenadas/número foram as vencedoras: ${JSON.stringify(resultado)}. Entra em contacto com a organização!`;

    await this.enviarEmail(email, assunto, corpo);

    if (pushToken) {
      await this.enviarPush(
        pushToken,
        '🎉 Ganhaste!',
        `Parabéns ${nome}! Foste o vencedor do jogo ${jogoNome}.`,
      );
    }

    return true;
  }

  async notificarSorteioRealizado(
    emails: string[],
    jogoNome: string,
    tokens: string[],
  ) {
    const assunto = `Sorteio Realizado: ${jogoNome}`;
    const corpo = `O sorteio do jogo ${jogoNome} já foi realizado. Consulta os resultados na aplicação!`;

    for (const email of emails) {
      await this.enviarEmail(email, assunto, corpo);
    }

    for (const token of tokens) {
      await this.enviarPush(
        token,
        'Sorteio Realizado',
        `O resultado do jogo ${jogoNome} já está disponível.`,
      );
    }

    return true;
  }
}
