import 'package:flutter_test/flutter_test.dart';
import 'package:aldeias_app/models/aldeia.dart';

void main() {
  group('Aldeia Model Tests', () {
    test('Should create Aldeia from JSON', () {
      final json = {
        'id': '1',
        'nome': 'Oleiros',
        'descricao': 'Vila Verde',
        'localizacao': 'Braga',
        'logo_url': 'http://logo.com'
      };

      final aldeia = Aldeia.fromJson(json);

      expect(aldeia.id, '1');
      expect(aldeia.nome, 'Oleiros');
      expect(aldeia.descricao, 'Vila Verde');
    });
  });
}
