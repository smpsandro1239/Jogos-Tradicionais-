import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';
import '../services/notification_service.dart';

class NotificacoesScreen extends StatelessWidget {
  const NotificacoesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Notificações'),
        actions: [
          IconButton(
            icon: const Icon(Icons.done_all),
            onPressed: () => context.read<NotificationService>().markAllAsRead(),
            tooltip: 'Marcar todas como lidas',
          ),
          IconButton(
            icon: const Icon(Icons.delete_outline),
            onPressed: () => context.read<NotificationService>().clearAll(),
            tooltip: 'Limpar tudo',
          ),
        ],
      ),
      body: Consumer<NotificationService>(
        builder: (context, service, _) {
          if (service.notifications.isEmpty) {
            return const Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.notifications_none, size: 64, color: Colors.grey),
                  SizedBox(height: 16),
                  Text('Ainda não tens notificações.', style: TextStyle(color: Colors.grey)),
                ],
              ),
            );
          }

          return ListView.builder(
            itemCount: service.notifications.length,
            itemBuilder: (context, index) {
              final n = service.notifications[index];
              final dateFormat = DateFormat('dd/MM HH:mm');

              return Container(
                color: n.lida ? null : Colors.green.withOpacity(0.05),
                child: ListTile(
                  leading: CircleAvatar(
                    backgroundColor: n.lida ? Colors.grey[200] : Colors.green[100],
                    child: Icon(
                      n.titulo.contains('🎉') ? Icons.emoji_events : Icons.notifications,
                      color: n.lida ? Colors.grey : Colors.green,
                    ),
                  ),
                  title: Text(
                    n.titulo,
                    style: TextStyle(
                      fontWeight: n.lida ? FontWeight.normal : FontWeight.bold,
                    ),
                  ),
                  subtitle: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(n.mensagem),
                      Text(
                        dateFormat.format(n.data),
                        style: const TextStyle(fontSize: 10, color: Colors.grey),
                      ),
                    ],
                  ),
                  onTap: () => service.markAsRead(n.id),
                ),
              );
            },
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => context.read<NotificationService>().simulateNotification(),
        child: const Icon(Icons.add_alert),
        tooltip: 'Simular Notificação (Demo)',
      ),
    );
  }
}
