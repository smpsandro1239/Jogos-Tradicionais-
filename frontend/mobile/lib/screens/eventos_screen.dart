import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';
import '../core/auth_provider.dart';
import '../models/aldeia.dart';
import '../models/evento.dart';
import '../services/evento_service.dart';

class EventosScreen extends StatefulWidget {
  final Aldeia aldeia;

  const EventosScreen({super.key, required this.aldeia});

  @override
  State<EventosScreen> createState() => _EventosScreenState();
}

class _EventosScreenState extends State<EventosScreen> {
  final EventoService _eventoService = EventoService();
  List<Evento>? _eventos;
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _loadEventos();
  }

  Future<void> _loadEventos() async {
    try {
      final token = Provider.of<AuthProvider>(context, listen: false).token;
      if (token != null) {
        final eventos = await _eventoService.getEventosByAldeia(widget.aldeia.id, token);
        setState(() {
          _eventos = eventos;
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
    return Scaffold(
      appBar: AppBar(
        title: Text('Eventos - ${widget.aldeia.nome}'),
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : _error != null
              ? Center(child: Text('Erro: $_error'))
              : _eventos == null || _eventos!.isEmpty
                  ? const Center(child: Text('Nenhum evento ativo nesta aldeia.'))
                  : ListView.builder(
                      itemCount: _eventos!.length,
                      itemBuilder: (context, index) {
                        final evento = _eventos![index];
                        final dateFormat = DateFormat('dd/MM/yyyy HH:mm');

                        return Card(
                          margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                          child: ListTile(
                            leading: const Icon(Icons.event, color: Colors.orange),
                            title: Text(evento.nome, style: const TextStyle(fontWeight: FontWeight.bold)),
                            subtitle: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(evento.descricao ?? 'Sem descrição'),
                                const SizedBox(height: 4),
                                Text(
                                  'Início: ${dateFormat.format(evento.dataInicio)}',
                                  style: const TextStyle(fontSize: 12, color: Colors.grey),
                                ),
                              ],
                            ),
                            trailing: Container(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                              decoration: BoxDecoration(
                                color: evento.estado == 'ativo' ? Colors.green : Colors.grey,
                                borderRadius: BorderRadius.circular(12),
                              ),
                              child: Text(
                                evento.estado.toUpperCase(),
                                style: const TextStyle(color: Colors.white, fontSize: 10),
                              ),
                            ),
                            onTap: () {
                              // Navegar para listagem de jogos do evento (Sprint futura)
                            },
                          ),
                        );
                      },
                    ),
    );
  }
}
