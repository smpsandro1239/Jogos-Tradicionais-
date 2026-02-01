class User {
  final String id;
  final String nome;
  final String email;
  final String role;
  final String? aldeiaId;

  User({
    required this.id,
    required this.nome,
    required this.email,
    required this.role,
    this.aldeiaId,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      nome: json['nome'],
      email: json['email'],
      role: json['role'],
      aldeiaId: json['aldeiaId'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'nome': nome,
      'email': email,
      'role': role,
      'aldeiaId': aldeiaId,
    };
  }
}
