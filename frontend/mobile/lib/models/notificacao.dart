class Notificacao {
  final String id;
  final String titulo;
  final String mensagem;
  final DateTime data;
  bool lida;

  Notificacao({
    required this.id,
    required this.titulo,
    required this.mensagem,
    required this.data,
    this.lida = false,
  });

  Map<String, dynamic> toJson() => {
    'id': id,
    'titulo': titulo,
    'mensagem': mensagem,
    'data': data.toIso8601String(),
    'lida': lida,
  };

  factory Notificacao.fromJson(Map<String, dynamic> json) => Notificacao(
    id: json['id'],
    titulo: json['titulo'],
    mensagem: json['mensagem'],
    data: DateTime.parse(json['data']),
    lida: json['lida'] ?? false,
  );
}
