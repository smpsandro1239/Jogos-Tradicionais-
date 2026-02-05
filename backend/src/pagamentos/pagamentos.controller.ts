import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PagamentosService } from './pagamentos.service';

@ApiTags('Pagamentos')
@Controller('pagamentos')
export class PagamentosController {
  constructor(private readonly pagamentosService: PagamentosService) {}

  @Post('webhook/simulado')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Webhook simulado para confirmar pagamentos' })
  @ApiResponse({ status: 200, description: 'Pagamento processado' })
  async webhookSimulado(
    @Body()
    body: {
      participacaoId: string;
      transactionId: string;
      success: boolean;
    },
  ) {
    if (body.success) {
      return await this.pagamentosService.processarConfirmacao(
        body.participacaoId,
        body.transactionId,
      );
    } else {
      return await this.pagamentosService.cancelarParticipacao(
        body.participacaoId,
        'Falha no pagamento simulado',
      );
    }
  }
}
