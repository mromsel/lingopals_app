import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class LessonsPage extends StatelessWidget {
  const LessonsPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text(
        // 'Lessons',
        AppLocalizations.of(context)!.lessons,
        style: const TextStyle(fontSize: 50),
      ),
    );
  }
}
