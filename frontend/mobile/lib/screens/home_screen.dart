import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../core/auth_provider.dart';
import '../models/aldeia.dart';
import '../services/aldeia_service.dart';
import 'eventos_screen.dart';

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

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Aldeias Disponíveis'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () => auth.logout(),
          ),
        ],
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : _error != null
              ? Center(child: Text('Erro: $_error'))
              : _aldeias == null || _aldeias!.isEmpty
                  ? const Center(child: Text('Nenhuma aldeia encontrada.'))
                  : ListView.builder(
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
    );
  }
}
