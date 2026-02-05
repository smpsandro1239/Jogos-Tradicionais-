import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';
import '../core/auth_provider.dart';
import '../models/participacao.dart';
import '../models/jogo.dart';
import '../services/participacao_service.dart';

class MinhasParticipacoesScreen extends StatefulWidget {
  const MinhasParticipacoesScreen({super.key});

  @override
  State<MinhasParticipacoesScreen> createState() => _MinhasParticipacoesScreenState();
}

class _MinhasParticipacoesScreenState extends State<MinhasParticipacoesScreen> {
  final ParticipacaoService _participacaoService = ParticipacaoService();
  List<Participacao>? _participacoes;
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _loadParticipacoes();
  }

  Future<void> _loadParticipacoes() async {
    try {
      final token = Provider.of<AuthProvider>(context, listen: false).token;
      if (token != null) {
        final participacoes = await _participacaoService.getMyParticipations(token);
        setState(() {
          _participacoes = participacoes;
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
        title: const Text('As Minhas Participações'),
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : _error != null
              ? Center(child: Text('Erro: $_error'))
              : _participacoes == null || _participacoes!.isEmpty
                  ? const Center(child: Text('Ainda não participou em nenhum jogo.'))
                  : RefreshIndicator(
                      onRefresh: _loadParticipacoes,
                      child: ListView.builder(
                        itemCount: _participacoes!.length,
                        itemBuilder: (context, index) {
                          final p = _participacoes![index];
                          final dateFormat = DateFormat('dd/MM/yyyy HH:mm');

                          return Card(
                            margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                            child: ListTile(
                              leading: Icon(
                                p.jogo?.tipo == JogoTipo.poio_vaca ? Icons.grid_on : Icons.confirmation_number,
                                color: Colors.orange,
                              ),
                              title: Text(
                                p.jogo?.tipo == JogoTipo.poio_vaca ? 'Poio da Vaca' : 'Rifa',
                                style: const TextStyle(fontWeight: FontWeight.bold),
                              ),
                              subtitle: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text('Dados: ${p.dadosParticipacao}'),
                                  Text('Valor: ${p.valorPago}€'),
                                  Text('Data: ${dateFormat.format(p.createdAt)}'),
                                ],
                              ),
                              trailing: Chip(
                                label: Text(
                                  p.status.name.toUpperCase(),
                                  style: const TextStyle(color: Colors.white, fontSize: 10),
                                ),
                                backgroundColor: p.status == ParticipacaoStatus.pago
                                    ? Colors.green
                                    : (p.status == ParticipacaoStatus.cancelado ? Colors.red : Colors.orange),
                              ),
                            ),
                          );
                        },
                      ),
                    ),
    );
  }
}
