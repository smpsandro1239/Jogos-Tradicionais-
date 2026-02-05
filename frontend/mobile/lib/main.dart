import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'core/app_theme.dart';
import 'core/auth_provider.dart';
import 'services/notification_service.dart';
import 'services/socket_service.dart';
import 'screens/splash_screen.dart';
import 'screens/login_screen.dart';
import 'screens/register_screen.dart';
import 'screens/home_screen.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()..tryAutoLogin()),
        ChangeNotifierProvider(create: (_) => NotificationService()),
        ProxyProvider2<AuthProvider, NotificationService, SocketService>(
          update: (_, auth, notif, prev) {
            final service = prev ?? SocketService(notif);
            if (auth.isAuthenticated) {
              // Conectar se estiver autenticado.
              // Se não tiver aldeiaId no payload, pode usar 'global'
              service.connect(auth.userPayload?['aldeiaId'] ?? 'global');
            } else {
              service.disconnect();
            }
            return service;
          },
        ),
      ],
      child: const AldeiasApp(),
    ),
  );
}

class AldeiasApp extends StatelessWidget {
  const AldeiasApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Aldeias App',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      home: Consumer<AuthProvider>(
        builder: (context, auth, _) {
          if (auth.isInitializing) {
            return const SplashScreen();
          }
          if (auth.isAuthenticated) {
            return const HomeScreen();
          } else {
            return const LoginScreen();
          }
        },
      ),
      routes: {
        '/login': (context) => const LoginScreen(),
        '/register': (context) => const RegisterScreen(),
        '/home': (context) => const HomeScreen(),
      },
    );
  }
}
