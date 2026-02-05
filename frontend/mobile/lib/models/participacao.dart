import 'jogo.dart';

enum ParticipacaoStatus {
  pendente,
  pago,
  cancelado,
}

class Participacao {
  final String id;
  final String jogoId;
  final String utilizadorId;
  final Map<String, dynamic> dadosParticipacao;
  final double valorPago;
  final ParticipacaoStatus status;
  final DateTime createdAt;
  final Jogo? jogo;

  Participacao({
    required this.id,
    required this.jogoId,
    required this.utilizadorId,
    required this.dadosParticipacao,
    required this.valorPago,
    required this.status,
    required this.createdAt,
    this.jogo,
  });

  factory Participacao.fromJson(Map<String, dynamic> json) {
    return Participacao(
      id: json['id'],
      jogoId: json['jogoId'],
      utilizadorId: json['utilizadorId'],
      dadosParticipacao: json['dados_participacao'],
      valorPago: double.parse(json['valor_pago'].toString()),
      status: ParticipacaoStatus.values.firstWhere(
        (e) => e.toString().split('.').last == json['status'],
        orElse: () => ParticipacaoStatus.pendente,
      ),
      createdAt: DateTime.parse(json['created_at']),
      jogo: json['jogo'] != null ? Jogo.fromJson(json['jogo']) : null,
    );
  }
}
