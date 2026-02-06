import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:jwt_decoder/jwt_decoder.dart';
import '../services/auth_service.dart';
import '../models/user.dart';

class AuthProvider with ChangeNotifier {
  String? _token;
  Map<String, dynamic>? _userPayload;
  bool _isInitializing = true;
  final _storage = const FlutterSecureStorage();
  final _authService = AuthService();

  bool get isAuthenticated => _token != null && !JwtDecoder.isExpired(_token!);
  bool get isInitializing => _isInitializing;
  String? get token => _token;
  Map<String, dynamic>? get userPayload => _userPayload;
  User? get user => _userPayload != null ? User(
    id: _userPayload!['sub'] ?? '',
    nome: _userPayload!['nome'] ?? 'Utilizador',
    email: _userPayload!['email'] ?? '',
    role: _userPayload!['role'] ?? 'user',
    aldeiaId: _userPayload!['aldeiaId'],
  ) : null;

  Future<void> login(String email, String password) async {
    try {
      final response = await _authService.login(email, password);
      _token = response.accessToken;
      _userPayload = JwtDecoder.decode(_token!);
      await _storage.write(key: 'jwt_token', value: _token);
      notifyListeners();
    } catch (e) {
      rethrow;
    }
  }

  Future<void> register(String nome, String email, String password) async {
    try {
      await _authService.register(nome, email, password);
    } catch (e) {
      rethrow;
    }
  }

  Future<void> logout() async {
    _token = null;
    _userPayload = null;
    await _storage.delete(key: 'jwt_token');
    notifyListeners();
  }

  Future<void> tryAutoLogin() async {
    try {
      final savedToken = await _storage.read(key: 'jwt_token');
      if (savedToken != null && !JwtDecoder.isExpired(savedToken)) {
        _token = savedToken;
        _userPayload = JwtDecoder.decode(_token!);
      }
    } finally {
      _isInitializing = false;
      notifyListeners();
    }
  }
}
