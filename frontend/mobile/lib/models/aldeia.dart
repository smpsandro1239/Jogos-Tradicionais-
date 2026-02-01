class Aldeia {
  final String id;
  final String nome;
  final String? descricao;
  final String? localizacao;
  final String? logoUrl;

  Aldeia({
    required this.id,
    required this.nome,
    this.descricao,
    this.localizacao,
    this.logoUrl,
  });

  factory Aldeia.fromJson(Map<String, dynamic> json) {
    return Aldeia(
      id: json['id'],
      nome: json['nome'],
      descricao: json['descricao'],
      localizacao: json['localizacao'],
      logoUrl: json['logo_url'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'nome': nome,
      'descricao': descricao,
      'localizacao': localizacao,
      'logo_url': logoUrl,
    };
  }
}
