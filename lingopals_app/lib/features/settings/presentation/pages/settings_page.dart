import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class SettingsPage extends StatelessWidget {
  const SettingsPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text(
        // 'Settings',
        AppLocalizations.of(context)!.settings,
        style: const TextStyle(fontSize: 50),
      ),
    );
  }
}
