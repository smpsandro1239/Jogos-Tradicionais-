import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../core/auth_provider.dart';
import '../models/evento.dart';
import '../models/jogo.dart';
import '../services/jogo_service.dart';

class JogosScreen extends StatefulWidget {
  final Evento evento;

  const JogosScreen({super.key, required this.evento});

  @override
  State<JogosScreen> createState() => _JogosScreenState();
}

class _JogosScreenState extends State<JogosScreen> {
  final JogoService _jogoService = JogoService();
  List<Jogo>? _jogos;
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _loadJogos();
  }

  Future<void> _loadJogos() async {
    try {
      final token = Provider.of<AuthProvider>(context, listen: false).token;
      if (token != null) {
        final jogos = await _jogoService.getJogosByEvento(widget.evento.id, token);
        setState(() {
          _jogos = jogos;
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
        title: Text('Jogos - ${widget.evento.nome}'),
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : _error != null
              ? Center(child: Text('Erro: $_error'))
              : _jogos == null || _jogos!.isEmpty
                  ? const Center(child: Text('Nenhum jogo disponível neste evento.'))
                  : ListView.builder(
                      itemCount: _jogos!.length,
                      itemBuilder: (context, index) {
                        final jogo = _jogos![index];
                        return Card(
                          margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                          child: ExpansionTile(
                            leading: Icon(
                              jogo.tipo == JogoTipo.poio_vaca ? Icons.grid_on : Icons.confirmation_number,
                              color: Colors.green,
                            ),
                            title: Text(
                              jogo.tipo == JogoTipo.poio_vaca ? 'Poio da Vaca' : 'Rifa',
                              style: const TextStyle(fontWeight: FontWeight.bold),
                            ),
                            subtitle: Text('Preço: ${jogo.precoParticipacao}€'),
                            children: [
                              if (jogo.tipo == JogoTipo.poio_vaca)
                                Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: PoioVacaGrid(jogo: jogo),
                                )
                              else if (jogo.tipo == JogoTipo.rifa)
                                Padding(
                                  padding: const EdgeInsets.all(16.0),
                                  child: Text('Total de Bilhetes: ${jogo.config['total_bilhetes']}'),
                                ),
                              Padding(
                                padding: const EdgeInsets.all(8.0),
                                child: ElevatedButton(
                                  onPressed: () {
                                    // Futura implementação de compra
                                  },
                                  child: const Text('Participar'),
                                ),
                              ),
                            ],
                          ),
                        );
                      },
                    ),
    );
  }
}

class PoioVacaGrid extends StatelessWidget {
  final Jogo jogo;

  const PoioVacaGrid({super.key, required this.jogo});

  @override
  Widget build(BuildContext context) {
    final int linhas = jogo.config['linhas'] ?? 0;
    final int colunas = jogo.config['colunas'] ?? 0;

    return Column(
      children: [
        Text('Grelha: $linhas x $colunas', style: const TextStyle(fontWeight: FontWeight.bold)),
        const SizedBox(height: 10),
        Container(
          height: 300,
          decoration: BoxDecoration(
            border: Border.all(color: Colors.brown, width: 2),
            color: Colors.green[100],
          ),
          child: GridView.builder(
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: colunas,
            ),
            itemCount: linhas * colunas,
            itemBuilder: (context, index) {
              final int linha = (index ~/ colunas) + 1;
              final int coluna = (index % colunas) + 1;

              return Container(
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.green[800]!.withOpacity(0.3)),
                ),
                child: Center(
                  child: Text(
                    '$linha,$coluna',
                    style: TextStyle(fontSize: 8, color: Colors.green[900]),
                  ),
                ),
              );
            },
          ),
        ),
      ],
    );
  }
}
