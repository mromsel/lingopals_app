import 'package:flutter/material.dart';
import 'package:lingopals_app/widgets/header_login.dart';
import 'package:lingopals_app/widgets/logo_header.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: ListView(
        padding: EdgeInsets.only(top: 0),
        physics: BouncingScrollPhysics(),
        children: [
          Stack(
            children: [
              HeaderLogin(),
              LogoHeader(),
            ],
          ),
        ],
      ),
    );
  }
}
