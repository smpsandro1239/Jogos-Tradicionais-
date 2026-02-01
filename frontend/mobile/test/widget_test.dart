import 'package:flutter_test/flutter_test.dart';
import 'package:aldeias_app/main.dart';

void main() {
  testWidgets('Splash screen shows smoke test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const AldeiasApp());

    // Verify that the splash screen text is present
    expect(find.text('JOGOS TRADICIONAIS'), findsOneWidget);

    // We need to pump until the timer in SplashScreen finishes or just ignore it for this smoke test
    // To properly dispose of the timer, we can pump for the duration of the timer
    await tester.pump(const Duration(seconds: 4));
  });
}
