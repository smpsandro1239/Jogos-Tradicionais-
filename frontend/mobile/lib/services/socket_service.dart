import 'package:flutter/foundation.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;
import '../core/api_config.dart';
import 'notification_service.dart';

class SocketService {
  IO.Socket? _socket;
  final NotificationService _notificationService;

  SocketService(this._notificationService);

  void connect(String? aldeiaId) {
    if (aldeiaId == null) return;

    _socket = IO.io(ApiConfig.baseUrl, IO.OptionBuilder()
      .setTransports(['websocket'])
      .disableAutoConnect()
      .build());

    _socket!.connect();

    _socket!.onConnect((_) {
      debugPrint('Connected to WebSocket');
      _socket!.emit('join_aldeia', aldeiaId);
    });

    _socket!.on('jogo_sorteado', (data) {
      debugPrint('Sorteio recebido: $data');
      _notificationService.addNotification(
        '🎉 Sorteio Realizado!',
        data['resultado'] ?? 'Um jogo foi finalizado. Vem ver o resultado!'
      );
    });

    _socket!.onDisconnect((_) => debugPrint('Disconnected from WebSocket'));
  }

  void disconnect() {
    _socket?.disconnect();
    _socket = null;
  }
}
