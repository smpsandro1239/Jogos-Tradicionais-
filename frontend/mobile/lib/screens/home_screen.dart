import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../core/auth_provider.dart';
import '../models/aldeia.dart';
import '../services/aldeia_service.dart';
import '../services/notification_service.dart';
import 'eventos_screen.dart';
import 'minhas_participacoes_screen.dart';
import 'notificacoes_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final AldeiaService _aldeiaService = AldeiaService();
  List<Aldeia>? _aldeias;
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _loadAldeias();
    _registerPushToken();
  }

  Future<void> _loadAldeias() async {
    try {
      final token = Provider.of<AuthProvider>(context, listen: false).token;
      if (token != null) {
        final aldeias = await _aldeiaService.getAldeias(token);
        setState(() {
          _aldeias = aldeias;
          _isLoading = false;
        });
      }
    } catch (e) {
      setState(() {
        _error = e.toString();
        _isLoading = false;
      });
    }
  }

  Future<void> _registerPushToken() async {
    final auth = context.read<AuthProvider>();
    final notif = context.read<NotificationService>();
    if (auth.isAuthenticated && auth.token != null && auth.user != null) {
      // Simulação de obtenção de token real do dispositivo
      const mockToken = 'push_token_simulado_123';
      await notif.registerPushToken(auth.user!.id, mockToken, auth.token!);
    }
  }

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthProvider>(context);
    final user = auth.user;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Aldeias Disponíveis'),
        actions: [
          Consumer<NotificationService>(
            builder: (context, service, _) {
              return Stack(
                children: [
                  IconButton(
                    icon: const Icon(Icons.notifications),
                    onPressed: () => Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => const NotificacoesScreen()),
                    ),
                  ),
                  if (service.unreadCount > 0)
                    Positioned(
                      right: 8,
                      top: 8,
                      child: Container(
                        padding: const EdgeInsets.all(2),
                        decoration: BoxDecoration(
                          color: Colors.red,
                          borderRadius: BorderRadius.circular(10),
                        ),
                        constraints: const BoxConstraints(
                          minWidth: 16,
                          minHeight: 16,
                        ),
                        child: Text(
                          '${service.unreadCount}',
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                    ),
                ],
              );
            },
          ),
        ],
      ),
      drawer: Drawer(
        child: Column(
          children: [
            UserAccountsDrawerHeader(
              accountName: Text(user?.nome ?? 'Utilizador'),
              accountEmail: Text(user?.email ?? ''),
              currentAccountPicture: const CircleAvatar(
                backgroundColor: Colors.white,
                child: Icon(Icons.person, size: 40, color: Colors.green),
              ),
              decoration: const BoxDecoration(color: Colors.green),
            ),
            ListTile(
              leading: const Icon(Icons.home),
              title: const Text('Início'),
              onTap: () => Navigator.pop(context),
            ),
            ListTile(
              leading: const Icon(Icons.history),
              title: const Text('As Minhas Participações'),
              onTap: () {
                Navigator.pop(context);
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const MinhasParticipacoesScreen()),
                );
              },
            ),
            ListTile(
              leading: const Icon(Icons.notifications),
              title: const Text('Notificações'),
              trailing: Consumer<NotificationService>(
                builder: (context, service, _) {
                  return service.unreadCount > 0
                    ? CircleAvatar(
                        radius: 10,
                        backgroundColor: Colors.red,
                        child: Text('${service.unreadCount}', style: const TextStyle(fontSize: 10, color: Colors.white)))
                    : const SizedBox.shrink();
                }
              ),
              onTap: () {
                Navigator.pop(context);
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const NotificacoesScreen()),
                );
              },
            ),
            const Spacer(),
            const Divider(),
            ListTile(
              leading: const Icon(Icons.logout),
              title: const Text('Sair'),
              onTap: () {
                auth.logout();
              },
            ),
            const SizedBox(height: 16),
          ],
        ),
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : _error != null
              ? Center(child: Text('Erro: $_error'))
              : _aldeias == null || _aldeias!.isEmpty
                  ? const Center(child: Text('Nenhuma aldeia encontrada.'))
                  : RefreshIndicator(
                      onRefresh: _loadAldeias,
                      child: ListView.builder(
                        itemCount: _aldeias!.length,
                        itemBuilder: (context, index) {
                          final aldeia = _aldeias![index];
                          return Card(
                            margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                            child: ListTile(
                              leading: const Icon(Icons.location_city, color: Colors.green),
                              title: Text(aldeia.nome, style: const TextStyle(fontWeight: FontWeight.bold)),
                              subtitle: Text(aldeia.descricao ?? 'Sem descrição'),
                              trailing: const Icon(Icons.arrow_forward_ios, size: 16),
                              onTap: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => EventosScreen(aldeia: aldeia),
                                  ),
                                );
                              },
                            ),
                          );
                        },
                      ),
                    ),
    );
  }
}
