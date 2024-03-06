import 'package:flutter/material.dart';
import 'package:lingopals_app/widgets/header_login.dart';
import 'package:lingopals_app/widgets/logo_header.dart';
import 'package:lingopals_app/widgets/text_field_custom.dart';

class SignUpPage extends StatelessWidget {
  const SignUpPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ListView(
        padding: const EdgeInsets.only(top: 0),
        physics: const BouncingScrollPhysics(),
        children: const [
          Stack(children: [
            HeaderSignUp(),
            LogoHeader(),
          ]),
          _NavBar(),
          _SignUpForm(),
          _SignUpButton(),
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
          TextButton(
            onPressed: () => Navigator.pushNamed(context, 'login'),
            child: const Text(
              'SIGN IN',
              style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.normal,
                  color: Colors.grey),
            ),
          ),
          const Text(
            '/',
            style: TextStyle(
              fontSize: 25,
              color: Colors.grey,
            ),
          ),
          const Text(
            'SIGN UP',
            style: TextStyle(
              fontSize: 25,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}

class _SignUpForm extends StatelessWidget {
  const _SignUpForm({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const Padding(
      padding: EdgeInsets.symmetric(horizontal: 20.0),
      child: Column(
        children: [
          TextFieldCustom(
            icon: Icons.person,
            type: TextInputType.text,
            text: 'Username',
          ),
          SizedBox(
            height: 20,
          ),
          TextFieldCustom(
            icon: Icons.mail_outline,
            type: TextInputType.emailAddress,
            text: 'Email address',
          ),
          SizedBox(
            height: 20,
          ),
          TextFieldCustom(
            icon: Icons.visibility_off,
            type: TextInputType.text,
            pass: true,
            text: 'Password',
          ),
          SizedBox(
            height: 20,
          )
        ],
      ),
    );
  }
}

class _SignUpButton extends StatelessWidget {
  const _SignUpButton({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.all(25),
      decoration: BoxDecoration(
        color: const Color(0xff5511b0),
        borderRadius: BorderRadius.circular(50),
      ),
      child: TextButton(
        onPressed: () {},
        child: const Text(
          'SIGN UP',
          style: TextStyle(
            color: Colors.white,
            fontSize: 18,
          ),
        ),
      ),
    );
  }
}
