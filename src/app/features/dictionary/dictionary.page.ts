import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserLanguages } from 'src/app/shared/interfaces/user-languages.interface';
import { Word } from 'src/app/shared/interfaces/word.interface';
import { ConfigService } from 'src/app/shared/services/config.service';
import { WordsService } from 'src/app/shared/services/words.service';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.page.html',
  styleUrls: ['./dictionary.page.scss'],
})
export class DictionaryPage {

  unsubscribe$: Subject<void> = new Subject<void>();

  alphabet: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

  words: Array<Word> = new Array<Word>;

  sortedWords: { [letter: string]: Word[] } = {};

  preferredUserLanguages: UserLanguages | undefined

  constructor(
    private wordsService: WordsService,
    private configService: ConfigService,
    private router: Router
  ) { }

  ionViewWillEnter() {
    this.configService.preferredUserLanguages
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        preferredUserLanguages => {
          this.preferredUserLanguages = preferredUserLanguages

          this.wordsService.getAllWordsByLanguage(this.preferredUserLanguages.languageTarget.isoCode)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
              data => {
                this.words = data
                // #TEST
                this.words.forEach(element => {
                  this.words.push(element)
                });
                this.words.forEach(element => {
                  this.words.push(element)
                });
                // #END TEST

                this.sortWords();
              }
            )
        }
      )
  }

  sortWords() {
    this.words.sort((a, b) => ('' + a.wordString).localeCompare(b.wordString)); // Ordenar alfabéticamente

    // Separar palabras por letra
    this.alphabet.forEach(letter => {
      this.sortedWords[letter] = this.words.filter(word => word.wordString.startsWith(letter));
    });
    // Separar palabras por letra
    this.words.forEach(word => {
      const firstLetter = word.wordString.charAt(0).toUpperCase();
      if (this.alphabet.includes(firstLetter)) {
        this.sortedWords[firstLetter].push(word);
      }
    });
  }


  goToDetail(word: Word) {
    this.router.navigate(['app/dictionary/word-details/' + word.idWord])
  }

  ionViewWillLeave() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
