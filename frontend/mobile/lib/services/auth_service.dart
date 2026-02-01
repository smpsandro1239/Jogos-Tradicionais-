import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/auth_response.dart';

class AuthService {
  // Em ambiente de desenvolvimento Android Emulator, localhost é 10.0.2.2
  // Em iOS simulator é localhost. Para este ambiente sandbox, usaremos localhost.
  static const String baseUrl = 'http://localhost:3000/api';

  Future<AuthResponse> login(String email, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'email': email,
        'password': password,
      }),
    );

    if (response.statusCode == 200) {
      return AuthResponse.fromJson(jsonDecode(response.body));
    } else {
      final error = jsonDecode(response.body);
      throw Exception(error['message'] ?? 'Falha ao fazer login');
    }
  }

  Future<void> register(String nome, String email, String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/auth/register'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'nome': nome,
        'email': email,
        'password': password,
      }),
    );

    if (response.statusCode != 201) {
      final error = jsonDecode(response.body);
      throw Exception(error['message'] ?? 'Falha ao registar utilizador');
    }
  }
}
