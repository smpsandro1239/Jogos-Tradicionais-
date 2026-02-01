import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/aldeia.dart';
import '../core/api_config.dart';

class AldeiaService {
  Future<List<Aldeia>> getAldeias(String token) async {
    final response = await http.get(
      Uri.parse('${ApiConfig.baseUrl}/aldeias'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',
      },
    );

    if (response.statusCode == 200) {
      Iterable l = jsonDecode(response.body);
      return List<Aldeia>.from(l.map((model) => Aldeia.fromJson(model)));
    } else {
      throw Exception('Falha ao carregar aldeias');
    }
  }
}
