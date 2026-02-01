enum EventoStatus {
  agendado,
  ativo,
  terminado,
}

class Evento {
  final String id;
  final String nome;
  final String? descricao;
  final DateTime dataInicio;
  final DateTime? dataFim;
  final String estado;
  final String aldeiaId;

  Evento({
    required this.id,
    required this.nome,
    this.descricao,
    required this.dataInicio,
    this.dataFim,
    required this.estado,
    required this.aldeiaId,
  });

  factory Evento.fromJson(Map<String, dynamic> json) {
    return Evento(
      id: json['id'],
      nome: json['nome'],
      descricao: json['descricao'],
      dataInicio: DateTime.parse(json['data_inicio']),
      dataFim: json['data_fim'] != null ? DateTime.parse(json['data_fim']) : null,
      estado: json['estado'],
      aldeiaId: json['aldeiaId'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'nome': nome,
      'descricao': descricao,
      'data_inicio': dataInicio.toIso8601String(),
      'data_fim': dataFim?.toIso8601String(),
      'estado': estado,
      'aldeiaId': aldeiaId,
    };
  }
}
