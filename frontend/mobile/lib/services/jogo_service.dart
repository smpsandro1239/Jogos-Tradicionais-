import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/jogo.dart';
import '../core/api_config.dart';

class JogoService {
  Future<List<Jogo>> getJogosByEvento(String eventoId, String token) async {
    final response = await http.get(
      Uri.parse('${ApiConfig.baseUrl}/jogos?eventoId=$eventoId'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',
      },
    );

    if (response.statusCode == 200) {
      Iterable l = jsonDecode(response.body);
      return List<Jogo>.from(l.map((model) => Jogo.fromJson(model)));
    } else {
      throw Exception('Falha ao carregar jogos');
    }
  }
}
