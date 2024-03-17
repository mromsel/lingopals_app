import 'package:flutter/material.dart';
import 'package:lingopals_app/screens/main_screen.dart';
import 'package:lingopals_app/services/security_service.dart';
import 'package:lingopals_app/widgets/header_login.dart';
import 'package:lingopals_app/widgets/logo_header.dart';
import 'package:lingopals_app/widgets/text_field_custom.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: ListView(
        padding: const EdgeInsets.only(top: 0),
        physics: const BouncingScrollPhysics(),
        children: const [
          Stack(
            children: [
              HeaderLogin(),
              LogoHeader(),
            ],
          ),
          _NavBar(),
          SizedBox(
            height: 40,
          ),
          _EmailAndPassword(),
          _ForgotPassword(),
          SizedBox(
            height: 40,
          ),
          _ButtonSignIn()
        ],
      ),
    );
  }
}

class _NavBar extends StatelessWidget {
  const _NavBar({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(15.0),
      child: Row(
        children: [
          const Text(
            'SIGN IN',
            style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold),
          ),
          const Text(
            '/',
            style: TextStyle(
              fontSize: 25,
              color: Colors.grey,
            ),
          ),
          TextButton(
            onPressed: () => Navigator.pushNamed(context, 'signup'),
            child: const Text(
              'SIGN UP',
              style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.normal,
                  color: Colors.grey),
            ),
          ),
        ],
      ),
    );
  }
}

class _EmailAndPassword extends StatelessWidget {
  const _EmailAndPassword({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const Padding(
      padding: EdgeInsets.symmetric(horizontal: 20.0),
      child: Column(
        children: [
          TextFieldCustom(
              icon: Icons.mail_outline,
              type: TextInputType.emailAddress,
              text: 'Email address'),
          SizedBox(
            height: 20,
          ),
          TextFieldCustom(
              icon: Icons.visibility_off,
              type: TextInputType.text,
              pass: true,
              text: 'Password')
        ],
      ),
    );
  }
}

class _ForgotPassword extends StatelessWidget {
  const _ForgotPassword({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(right: 25, top: 20),
      alignment: Alignment.centerRight,
      child: const Text('Forgot Password?'),
    );
  }
}

class _ButtonSignIn extends StatelessWidget {
  const _ButtonSignIn({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.all(25),
      decoration: BoxDecoration(
        color: const Color(0xff5511b0),
        borderRadius: BorderRadius.circular(50),
      ),
      child: TextButton(
        child: const Text(
          'SIGN IN',
          style: TextStyle(color: Colors.white, fontSize: 18),
        ),
        onPressed: () {
          SecurityService().logUser('admin', 'admin').then(
                (value) => {
                  if (value)
                    {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => const MainScreen()),
                      )
                    }
                  else
                    {
                      //TODO: Code what happens if the auth fails
                    }
                },
              );
        },
      ),
    );
  }
}
