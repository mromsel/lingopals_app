import 'package:flutter/material.dart';
import 'package:google_nav_bar/google_nav_bar.dart';
import 'package:lingopals_app/pages/dictionary_page.dart';
import 'package:lingopals_app/pages/home_page.dart';
import 'package:lingopals_app/pages/lessons_page.dart';
import 'package:lingopals_app/pages/settings_page.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({Key? key}) : super(key: key);

  @override
  _MainScreenState createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int _selectedIndex = 0;

  void _navigateBottomBar(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  final List<Widget> _pages = [
    const HomePage(),
    const LessonsPage(),
    const DictionaryPage(),
    const SettingsPage(),
  ];

  @override
  Widget build(BuildContext context) {
    //Bottom nav bar
    return Scaffold(
      body: _pages[_selectedIndex],
      bottomNavigationBar: Container(
        color: Colors.black,
        child: Padding(
          padding: const EdgeInsets.symmetric(
            horizontal: 15.0,
            vertical: 20,
          ),
          child: GNav(
            backgroundColor: Colors.black,
            color: Colors.white,
            activeColor: Colors.white,
            tabBackgroundColor: Colors.grey.shade800,
            padding: const EdgeInsets.all(16),
            gap: 8,
            onTabChange: (index) {
              _navigateBottomBar(index);
            },
            tabs: [
              GButton(
                icon: Icons.home,
                text: AppLocalizations.of(context)!.home,
              ),
              GButton(
                icon: Icons.menu_book_outlined,
                text: AppLocalizations.of(context)!.lessons,
              ),
              GButton(
                icon: Icons.abc_rounded,
                text: AppLocalizations.of(context)!.dictionary,
              ),
              GButton(
                icon: Icons.settings,
                text: AppLocalizations.of(context)!.settings,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
