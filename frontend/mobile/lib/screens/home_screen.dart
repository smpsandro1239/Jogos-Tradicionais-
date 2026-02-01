import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../core/auth_provider.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final auth = Provider.of<AuthProvider>(context);
    final user = auth.userPayload;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Aldeias App'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () => auth.logout(),
          ),
        ],
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text('Bem-vindo!', style: TextStyle(fontSize: 24)),
            if (user != null) ...[
              const SizedBox(height: 16),
              Text('ID: ${user['sub']}'),
              Text('Role: ${user['role']}'),
            ],
            const SizedBox(height: 32),
            const Text('Listagem de aldeias brevemente...'),
          ],
        ),
      ),
    );
  }
}
