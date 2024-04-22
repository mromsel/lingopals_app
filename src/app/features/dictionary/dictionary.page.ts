import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Word } from 'src/app/shared/interfaces/word.interface';
import { WordsService } from 'src/app/shared/services/words.service';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.page.html',
  styleUrls: ['./dictionary.page.scss'],
})
export class DictionaryPage implements OnInit {

  alphabet: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

  words: Array<Word> = new Array<Word>;

  sortedWords: { [letter: string]: Word[] } = {};

  constructor(
    private wordsService: WordsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.wordsService.getAllWordsByLanguage(1).subscribe(
      data => {
        this.words = data
        // #DEBUG
        this.words.forEach(element => {
          this.words.push(element)
        });
        this.words.forEach(element => {
          this.words.push(element)
        });
        // #ENDDEBUG

        // this.words.sort((a, b) => ('' + a.word).localeCompare(b.word))
        this.sortWords();
      }
    )
  }

  sortWords() {
    this.words.sort((a, b) => ('' + a.word).localeCompare(b.word)); // Ordenar alfabéticamente

    // Separar palabras por letra
    this.alphabet.forEach(letter => {
      this.sortedWords[letter] = this.words.filter(word => word.word.startsWith(letter));
    });
    // Separar palabras por letra
    this.words.forEach(word => {
      const firstLetter = word.word.charAt(0).toUpperCase();
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

  goToDetail() {
    this.router.navigate(['dictionary/word-detail'])
  }
}
