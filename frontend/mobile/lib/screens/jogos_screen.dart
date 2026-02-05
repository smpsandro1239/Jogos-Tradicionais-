import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../core/auth_provider.dart';
import '../models/evento.dart';
import '../models/jogo.dart';
import '../services/jogo_service.dart';
import '../services/participacao_service.dart';

class JogosScreen extends StatefulWidget {
  final Evento evento;

  const JogosScreen({super.key, required this.evento});

  @override
  State<JogosScreen> createState() => _JogosScreenState();
}

class _JogosScreenState extends State<JogosScreen> {
  final JogoService _jogoService = JogoService();
  final ParticipacaoService _participacaoService = ParticipacaoService();
  List<Jogo>? _jogos;
  Map<String, List<Map<String, dynamic>>> _occupiedByJogo = {};
  bool _isLoading = true;
  String? _error;

  // Estado de seleção
  Map<String, dynamic>? _selectedData;
  String? _selectedJogoId;

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
    try {
      final token = Provider.of<AuthProvider>(context, listen: false).token;
      if (token != null) {
        final jogos = await _jogoService.getJogosByEvento(widget.evento.id, token);

        Map<String, List<Map<String, dynamic>>> occupied = {};
        for (var jogo in jogos) {
          final data = await _participacaoService.getOccupiedByJogo(jogo.id, token);
          occupied[jogo.id] = data;
        }

        setState(() {
          _jogos = jogos;
          _occupiedByJogo = occupied;
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

  Future<void> _participar(Jogo jogo) async {
    if (_selectedJogoId != jogo.id || _selectedData == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Por favor, selecione uma coordenada ou número.')),
      );
      return;
    }

    final confirm = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Confirmar Participação'),
        content: Text('Deseja participar no jogo ${jogo.tipo == JogoTipo.poio_vaca ? "Poio da Vaca" : "Rifa"} com os dados $_selectedData?\n\nPreço: ${jogo.precoParticipacao}€'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context, false), child: const Text('Cancelar')),
          ElevatedButton(onPressed: () => Navigator.pop(context, true), child: const Text('Confirmar')),
        ],
      ),
    );

    if (confirm != true) return;

    setState(() => _isLoading = true);

    try {
      final token = Provider.of<AuthProvider>(context, listen: false).token;
      if (token != null) {
        await _participacaoService.createParticipacao(
          jogo.id,
          _selectedData!,
          jogo.precoParticipacao,
          token,
        );

        if (!mounted) return;
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Participação registada com sucesso!'), backgroundColor: Colors.green),
        );

        // Recarregar dados para mostrar o novo quadrado ocupado
        _loadData();

        setState(() {
          _selectedData = null;
          _selectedJogoId = null;
        });
      }
    } catch (e) {
      if (!mounted) return;
      setState(() => _isLoading = false);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Erro: ${e.toString()}'), backgroundColor: Colors.red),
      );
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
                  : RefreshIndicator(
                      onRefresh: _loadData,
                      child: ListView.builder(
                        itemCount: _jogos!.length,
                        itemBuilder: (context, index) {
                          final jogo = _jogos![index];
                          final occupied = _occupiedByJogo[jogo.id] ?? [];

                          return Card(
                            margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                            child: ExpansionTile(
                              initiallyExpanded: index == 0,
                              leading: Icon(
                                jogo.tipo == JogoTipo.poio_vaca ? Icons.grid_on : Icons.confirmation_number,
                                color: Colors.green,
                              ),
                              title: Text(
                                jogo.tipo == JogoTipo.poio_vaca ? 'Poio da Vaca' : 'Rifa',
                                style: const TextStyle(fontWeight: FontWeight.bold),
                              ),
                              subtitle: Text('Preço: ${jogo.precoParticipacao}€ | Estado: ${jogo.estado.name.toUpperCase()}'),
                              children: [
                                if (jogo.tipo == JogoTipo.poio_vaca)
                                  Padding(
                                    padding: const EdgeInsets.all(8.0),
                                    child: PoioVacaGrid(
                                      jogo: jogo,
                                      occupied: occupied,
                                      selectedData: _selectedJogoId == jogo.id ? _selectedData : null,
                                      onSelect: (data) {
                                        setState(() {
                                          _selectedJogoId = jogo.id;
                                          _selectedData = data;
                                        });
                                      },
                                    ),
                                  )
                                else if (jogo.tipo == JogoTipo.rifa)
                                  Padding(
                                    padding: const EdgeInsets.all(16.0),
                                    child: RifaSelector(
                                      jogo: jogo,
                                      occupied: occupied,
                                      selectedData: _selectedJogoId == jogo.id ? _selectedData : null,
                                      onSelect: (data) {
                                        setState(() {
                                          _selectedJogoId = jogo.id;
                                          _selectedData = data;
                                        });
                                      },
                                    ),
                                  ),
                                Padding(
                                  padding: const EdgeInsets.all(16.0),
                                  child: SizedBox(
                                    width: double.infinity,
                                    child: ElevatedButton(
                                      style: ElevatedButton.styleFrom(
                                        backgroundColor: Colors.green,
                                        foregroundColor: Colors.white,
                                        padding: const EdgeInsets.symmetric(vertical: 12),
                                      ),
                                      onPressed: jogo.estado == JogoStatus.ativo
                                          ? () => _participar(jogo)
                                          : null,
                                      child: Text(jogo.estado == JogoStatus.ativo ? 'Participar Agora' : 'Jogo Indisponível'),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          );
                        },
                      ),
                    ),
    );
  }
}

class PoioVacaGrid extends StatelessWidget {
  final Jogo jogo;
  final List<Map<String, dynamic>> occupied;
  final Map<String, dynamic>? selectedData;
  final Function(Map<String, dynamic>) onSelect;

  const PoioVacaGrid({
    super.key,
    required this.jogo,
    required this.occupied,
    this.selectedData,
    required this.onSelect,
  });

  bool _isOccupied(int linha, int coluna) {
    return occupied.any((p) => p['dados_participacao']['linha'] == linha && p['dados_participacao']['coluna'] == coluna);
  }

  @override
  Widget build(BuildContext context) {
    final int linhas = jogo.config['linhas'] ?? 0;
    final int colunas = jogo.config['colunas'] ?? 0;

    return Column(
      children: [
        Text('Selecione um quadrado na grelha: $linhas x $colunas', style: const TextStyle(fontSize: 12)),
        const SizedBox(height: 10),
        Container(
          height: 300,
          decoration: BoxDecoration(
            border: Border.all(color: Colors.brown[300]!, width: 2),
            color: Colors.green[50],
          ),
          child: GridView.builder(
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: colunas,
            ),
            itemCount: linhas * colunas,
            itemBuilder: (context, index) {
              final int linha = (index ~/ colunas) + 1;
              final int coluna = (index % colunas) + 1;
              final bool occupied = _isOccupied(linha, coluna);
              final bool isSelected = selectedData != null &&
                                      selectedData!['linha'] == linha &&
                                      selectedData!['coluna'] == coluna;

              return InkWell(
                onTap: occupied ? null : () => onSelect({'linha': linha, 'coluna': coluna}),
                child: Container(
                  decoration: BoxDecoration(
                    color: occupied ? Colors.grey[400] : (isSelected ? Colors.orange.withOpacity(0.5) : null),
                    border: Border.all(color: Colors.green[800]!.withOpacity(0.1)),
                  ),
                  child: Center(
                    child: Text(
                      '$linha,$coluna',
                      style: TextStyle(
                        fontSize: 8,
                        color: occupied ? Colors.white70 : (isSelected ? Colors.white : Colors.green[900]),
                        fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                        decoration: occupied ? TextDecoration.lineThrough : null,
                      ),
                    ),
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

class RifaSelector extends StatelessWidget {
  final Jogo jogo;
  final List<Map<String, dynamic>> occupied;
  final Map<String, dynamic>? selectedData;
  final Function(Map<String, dynamic>) onSelect;

  const RifaSelector({
    super.key,
    required this.jogo,
    required this.occupied,
    this.selectedData,
    required this.onSelect,
  });

  bool _isOccupied(int numero) {
    return occupied.any((p) => p['dados_participacao']['numero'] == numero);
  }

  @override
  Widget build(BuildContext context) {
    final int totalBilhetes = jogo.config['total_bilhetes'] ?? 0;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text('Escolha o seu número da sorte:', style: TextStyle(fontSize: 12)),
        const SizedBox(height: 10),
        SizedBox(
          height: 200,
          child: GridView.builder(
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 5,
              childAspectRatio: 1.5,
            ),
            itemCount: totalBilhetes,
            itemBuilder: (context, index) {
              final int numero = index + 1;
              final bool occupied = _isOccupied(numero);
              final bool isSelected = selectedData != null &&
                                      selectedData!['numero'] == numero;

              return Padding(
                padding: const EdgeInsets.all(2.0),
                child: ChoiceChip(
                  label: Text(numero.toString().padLeft(3, '0')),
                  selected: isSelected,
                  onSelected: occupied ? null : (bool selected) {
                    if (selected) onSelect({'numero': numero});
                  },
                  selectedColor: Colors.orange,
                  disabledColor: Colors.grey[300],
                  labelStyle: TextStyle(
                    color: occupied ? Colors.grey : (isSelected ? Colors.white : Colors.black),
                    fontSize: 12,
                    decoration: occupied ? TextDecoration.lineThrough : null,
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
