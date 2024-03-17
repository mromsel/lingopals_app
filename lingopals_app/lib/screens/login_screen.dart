import 'package:flutter/material.dart';
import 'package:lingopals_app/features/user_auth/presentation/pages/login_page.dart';
import 'package:lingopals_app/features/user_auth/presentation/pages/signup_page.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Login Screen',
      initialRoute: 'login',
      routes: {
        'login': (context) => const LoginPage(),
        'signup': (context) => const SignUpPage(),
      },
    );
  }
}
