import 'package:flutter_test/flutter_test.dart';
import 'package:aldeias_app/models/jogo.dart';

void main() {
  group('Jogo Model Tests', () {
    test('Should create Jogo from JSON (Poio da Vaca)', () {
      final json = {
        'id': '1',
        'tipo': 'poio_vaca',
        'config': {'linhas': 10, 'colunas': 10},
        'preco_participacao': '2.50',
        'estado': 'ativo',
        'eventoId': 'evt-1'
      };

      final jogo = Jogo.fromJson(json);

      expect(jogo.id, '1');
      expect(jogo.tipo, JogoTipo.poio_vaca);
      expect(jogo.config['linhas'], 10);
      expect(jogo.precoParticipacao, 2.50);
      expect(jogo.estado, JogoStatus.ativo);
      expect(jogo.eventoId, 'evt-1');
    });

    test('Should create Jogo from JSON (Rifa)', () {
      final json = {
        'id': '2',
        'tipo': 'rifa',
        'config': {'total_bilhetes': 100},
        'preco_participacao': 1.0,
        'estado': 'fechado',
        'eventoId': 'evt-2'
      };

      final jogo = Jogo.fromJson(json);

      expect(jogo.id, '2');
      expect(jogo.tipo, JogoTipo.rifa);
      expect(jogo.config['total_bilhetes'], 100);
      expect(jogo.precoParticipacao, 1.0);
      expect(jogo.estado, JogoStatus.fechado);
    });
  });
}
