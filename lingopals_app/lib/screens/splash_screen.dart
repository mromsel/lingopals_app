import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:lingopals_app/screens/error_screen.dart';
import 'package:lingopals_app/screens/login_screen.dart';
import 'package:lingopals_app/screens/main_screen.dart';
import 'package:lingopals_app/services/security_service.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({Key? key}) : super(key: key);

  @override
  _SplashScreenState createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    // Shows the splash screen at least two seconds
    Timer(const Duration(seconds: 2), () {
      // Verifies if the user is logged
      if (SecurityService().isUserLogged()) {
        Navigator.of(context).pushReplacement(MaterialPageRoute(
          builder: (_) => const MainScreen(),
        ));
      } else {
        Navigator.of(context).pushReplacement(MaterialPageRoute(
          builder: (_) => const LoginScreen(),
        ));
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              AppLocalizations.of(context)!.welcome,
              textAlign: TextAlign.center,
              style: const TextStyle(
                fontSize: 30,
                fontWeight: FontWeight.bold,
              ),
            ),
            const CircularProgressIndicator(),
          ],
        ),
      ),
    );
  }
}
