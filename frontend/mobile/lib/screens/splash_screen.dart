import 'package:flutter/material.dart';
import '../core/app_colors.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    _navigateToHome();
  }

  _navigateToHome() async {
    await Future.delayed(const Duration(seconds: 3));
    if (!mounted) return;
    // Por agora apenas fica aqui, no futuro vai para a Home ou Login
  }

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      backgroundColor: AppColors.primary,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.games_outlined,
              size: 100,
              color: AppColors.onPrimary,
            ),
            SizedBox(height: 24),
            Text(
              'JOGOS TRADICIONAIS',
              style: TextStyle(
                color: AppColors.onPrimary,
                fontSize: 24,
                fontWeight: FontWeight.bold,
                letterSpacing: 2,
              ),
            ),
            SizedBox(height: 8),
            CircularProgressIndicator(
              color: AppColors.secondary,
            ),
          ],
        ),
      ),
    );
  }
}
