import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/evento.dart';
import '../core/api_config.dart';

class EventoService {
  Future<List<Evento>> getEventosByAldeia(String aldeiaId, String token) async {
    final response = await http.get(
      Uri.parse('${ApiConfig.baseUrl}/eventos?aldeiaId=$aldeiaId'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',
      },
    );

    if (response.statusCode == 200) {
      Iterable l = jsonDecode(response.body);
      return List<Evento>.from(l.map((model) => Evento.fromJson(model)));
    } else {
      throw Exception('Falha ao carregar eventos');
    }
  }
}
