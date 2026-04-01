import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'app.dart';
import 'providers/auth_provider.dart';

void main() async {
  // Ensure Flutter engine is ready before calling any plugins
  WidgetsFlutterBinding.ensureInitialized();
  
  final authProvider = AuthProvider();
  
  // Try to log in automatically, but wrap it to prevent crashes
  try {
    await authProvider.tryAutoLogin();
  } catch (e) {
    debugPrint('Auto-login failed: $e');
  }

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider.value(value: authProvider),
      ],
      child: const SocialReadingApp(),
    ),
  );
}
