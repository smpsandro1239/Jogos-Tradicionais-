import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/participacao.dart';
import '../core/api_config.dart';

class ParticipacaoService {
  Future<Participacao> createParticipacao(
    String jogoId,
    Map<String, dynamic> dados,
    double valor,
    String token,
  ) async {
    final response = await http.post(
      Uri.parse('${ApiConfig.baseUrl}/participacoes'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',
      },
      body: jsonEncode({
        'jogoId': jogoId,
        'dados_participacao': dados,
        'valor_pago': valor,
      }),
    );

    if (response.statusCode == 201) {
      return Participacao.fromJson(jsonDecode(response.body));
    } else {
      final errorBody = jsonDecode(response.body);
      throw Exception(errorBody['message'] ?? 'Falha ao criar participação');
    }
  }

  Future<List<Participacao>> getMyParticipations(String token) async {
    final response = await http.get(
      Uri.parse('${ApiConfig.baseUrl}/participacoes/me'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',
      },
    );

    if (response.statusCode == 200) {
      Iterable l = jsonDecode(response.body);
      return List<Participacao>.from(l.map((model) => Participacao.fromJson(model)));
    } else {
      throw Exception('Falha ao carregar as suas participações');
    }
  }

  Future<List<Map<String, dynamic>>> getOccupiedByJogo(String jogoId, String token) async {
    final response = await http.get(
      Uri.parse('${ApiConfig.baseUrl}/participacoes/jogo/$jogoId'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',
      },
    );

    if (response.statusCode == 200) {
      List<dynamic> l = jsonDecode(response.body);
      return List<Map<String, dynamic>>.from(l);
    } else {
      return [];
    }
  }
}
