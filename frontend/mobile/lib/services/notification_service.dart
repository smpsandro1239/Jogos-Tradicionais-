import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;
import '../models/notificacao.dart';
import '../core/api_config.dart';

class NotificationService extends ChangeNotifier {
  final _storage = const FlutterSecureStorage();
  List<Notificacao> _notifications = [];
  int _unreadCount = 0;

  List<Notificacao> get notifications => _notifications;
  int get unreadCount => _unreadCount;

  NotificationService() {
    _loadNotifications();
  }

  Future<void> _loadNotifications() async {
    final data = await _storage.read(key: 'notifications');
    if (data != null) {
      final List<dynamic> decoded = jsonDecode(data);
      _notifications = decoded.map((item) => Notificacao.fromJson(item)).toList();
      _unreadCount = _notifications.where((n) => !n.lida).length;
      notifyListeners();
    }
  }

  Future<void> _saveNotifications() async {
    final data = jsonEncode(_notifications.map((n) => n.toJson()).toList());
    await _storage.write(key: 'notifications', value: data);
  }

  Future<void> addNotification(String titulo, String mensagem) async {
    final newNotif = Notificacao(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      titulo: titulo,
      mensagem: mensagem,
      data: DateTime.now(),
    );
    _notifications.insert(0, newNotif);
    _unreadCount++;
    await _saveNotifications();
    notifyListeners();
  }

  Future<void> markAsRead(String id) async {
    final index = _notifications.indexWhere((n) => n.id == id);
    if (index != -1 && !_notifications[index].lida) {
      _notifications[index].lida = true;
      _unreadCount--;
      await _saveNotifications();
      notifyListeners();
    }
  }

  Future<void> markAllAsRead() async {
    for (var n in _notifications) {
      n.lida = true;
    }
    _unreadCount = 0;
    await _saveNotifications();
    notifyListeners();
  }

  Future<void> clearAll() async {
    _notifications.clear();
    _unreadCount = 0;
    await _saveNotifications();
    notifyListeners();
  }

  Future<void> registerPushToken(String userId, String token, String apiToken) async {
    try {
      final response = await http.patch(
        Uri.parse('${ApiConfig.baseUrl}/utilizadores/push-token'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $apiToken',
        },
        body: jsonEncode({'pushToken': token}),
      );

      if (response.statusCode != 200) {
        debugPrint('Erro ao registar push token: ${response.body}');
      }
    } catch (e) {
      debugPrint('Erro ao registar push token: $e');
    }
  }

  // Método para simular o recebimento de uma notificação (para demonstração)
  void simulateNotification() {
    addNotification(
      'Sorteio Realizado!',
      'O sorteio do Poio da Vaca já terminou. Vem ver quem ganhou!'
    );
  }
}
