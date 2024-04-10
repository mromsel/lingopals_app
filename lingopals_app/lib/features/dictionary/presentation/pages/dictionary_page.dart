import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class DictionaryPage extends StatelessWidget {
  const DictionaryPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text(
        // 'Dictionary',
        AppLocalizations.of(context)!.dictionary,
        style: const TextStyle(fontSize: 50),
      ),
    );
  }
}
