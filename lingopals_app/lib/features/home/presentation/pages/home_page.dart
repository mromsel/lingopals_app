import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class HomePage extends StatelessWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text(
        // 'Home',
        AppLocalizations.of(context)!.home,
        style: const TextStyle(fontSize: 50),
      ),
    );
  }
}
