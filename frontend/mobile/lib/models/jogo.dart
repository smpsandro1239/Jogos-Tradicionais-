enum JogoTipo {
  poio_vaca,
  rifa,
}

enum JogoStatus {
  ativo,
  pausado,
  fechado,
  terminado,
}

class Jogo {
  final String id;
  final JogoTipo tipo;
  final Map<String, dynamic> config;
  final double precoParticipacao;
  final JogoStatus estado;
  final String eventoId;

  Jogo({
    required this.id,
    required this.tipo,
    required this.config,
    required this.precoParticipacao,
    required this.estado,
    required this.eventoId,
  });

  factory Jogo.fromJson(Map<String, dynamic> json) {
    return Jogo(
      id: json['id'],
      tipo: JogoTipo.values.firstWhere(
        (e) => e.toString().split('.').last == json['tipo'],
        orElse: () => JogoTipo.poio_vaca,
      ),
      config: json['config'],
      precoParticipacao: double.parse(json['preco_participacao'].toString()),
      estado: JogoStatus.values.firstWhere(
        (e) => e.toString().split('.').last == json['estado'],
        orElse: () => JogoStatus.ativo,
      ),
      eventoId: json['eventoId'],
    );
  }
}
