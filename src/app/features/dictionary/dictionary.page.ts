import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Word } from 'src/app/shared/interfaces/word.interface';
import { WordsService } from 'src/app/shared/services/words.service';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.page.html',
  styleUrls: ['./dictionary.page.scss'],
})
export class DictionaryPage implements OnInit {

  unsubscribe$: Subject<void> = new Subject<void>();

  alphabet: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

  words: Array<Word> = new Array<Word>;

  sortedWords: { [letter: string]: Word[] } = {};

  constructor(
    private wordsService: WordsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.wordsService.getAllWordsByLanguage("en")
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

  scrollToElement(sectionId: string): void {
    const componente = document.getElementById(sectionId);

    if (componente != null) {
      componente.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // const buttonId = this.sections.filter((v: any) => v.sectionId === sectionId)[0].buttonId;    

  }

  toggleActive(buttonId: string | undefined) {
    const sectionButtons = document.getElementById('letters')?.getElementsByTagName('button');
    if (sectionButtons != null && buttonId != undefined) {
      Array.from(sectionButtons).forEach(b => {
        if (b.id === buttonId) {
          b.classList.add('active')
        }
        else {
          b.classList.remove('active')
        }
      });
    }
  }

  goToDetail(word: Word) {
    this.router.navigate(['app/dictionary/word-details/' + word.idWord])
  }

  ionViewWillLeave() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
