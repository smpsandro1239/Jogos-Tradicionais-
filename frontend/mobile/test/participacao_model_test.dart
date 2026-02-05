import 'package:flutter_test/flutter_test.dart';
import 'package:aldeias_app/models/participacao.dart';

void main() {
  group('Participacao Model Tests', () {
    test('Should create Participacao from JSON', () {
      final json = {
        'id': 'p-1',
        'jogoId': 'j-1',
        'utilizadorId': 'u-1',
        'dados_participacao': {'linha': 5, 'coluna': 5},
        'valor_pago': '2.00',
        'status': 'pago',
        'created_at': '2023-10-01T12:00:00Z'
      };

      final p = Participacao.fromJson(json);

      expect(p.id, 'p-1');
      expect(p.jogoId, 'j-1');
      expect(p.dadosParticipacao['linha'], 5);
      expect(p.valorPago, 2.0);
      expect(p.status, ParticipacaoStatus.pago);
      expect(p.createdAt.year, 2023);
    });
  });
}
