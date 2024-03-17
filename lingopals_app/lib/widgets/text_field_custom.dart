import 'package:flutter/material.dart';

class TextFieldCustom extends StatelessWidget {
  final IconData icon;
  final TextInputType type;
  final bool pass;
  final String text;

  const TextFieldCustom(
      {Key? key,
      required this.icon,
      required this.type,
      this.pass = false,
      required this.text})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextField(
      keyboardType: type,
      obscureText: pass,
      decoration: InputDecoration(
        hintText: text,
        filled: true,
        fillColor: const Color.fromARGB(250, 216, 187, 255),
        prefixIcon: Icon(icon, color: Colors.black87),
        border: OutlineInputBorder(
          borderSide: const BorderSide(color: Colors.black12),
          borderRadius: BorderRadius.circular(50),
        ),
        enabledBorder: OutlineInputBorder(
          borderSide: const BorderSide(color: Colors.purple),
          borderRadius: BorderRadius.circular(50),
        ),
      ),
    );
  }
}
