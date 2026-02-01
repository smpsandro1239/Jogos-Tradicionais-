import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';
import 'package:aldeias_app/main.dart';
import 'package:aldeias_app/core/auth_provider.dart';

void main() {
  testWidgets('Splash screen shows smoke test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(
      MultiProvider(
        providers: [
          ChangeNotifierProvider(create: (_) => AuthProvider()),
        ],
        child: const AldeiasApp(),
      ),
    );

    // Initial state should be initializing, thus showing SplashScreen
    expect(find.text('JOGOS TRADICIONAIS'), findsOneWidget);

    // We need to pump until the timer in tryAutoLogin or whatever finishes
    // For this test, we just want to see if it starts correctly.
    await tester.pump(const Duration(seconds: 4));
  });
}
