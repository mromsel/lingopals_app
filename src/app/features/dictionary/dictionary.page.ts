import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { ModalUserLanguagesCreateComponent } from 'src/app/shared/components/modal-user-languages-create/modal-user-languages-create.component';
import { UserLanguages } from 'src/app/shared/interfaces/user-related/user-languages.interface';
import { Word } from 'src/app/shared/interfaces/words-related/word.interface';
import { ConfigService } from 'src/app/shared/services/app/config.service';
import { UserInfoService } from 'src/app/shared/services/user-related/user-info.service';
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
    private userInfoService: UserInfoService,
    private configService: ConfigService,
    private router: Router,
    private _modalController: ModalController,
  ) { }

  ionViewWillEnter() {
    let userLanguages = this.userInfoService.userLanguages

    if (userLanguages && userLanguages.length > 0) {
      this.getAllWordsByLanguage(userLanguages.filter(userLanguage => userLanguage.preferred)[0])

      this.configService.preferredUserLanguagesSubject
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          preferredUserLanguages => {
            this.preferredUserLanguages = preferredUserLanguages
            this.getAllWordsByLanguage(this.preferredUserLanguages)
          }
        )
    } else {
      this.openAddUserLanguagesModal()
    }
  }

  getAllWordsByLanguage(preferredUserLanguages: UserLanguages) {
    this.wordsService.getAllWordsByLanguage(preferredUserLanguages.languageTarget.isoCode)
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
    this.words.sort((a, b) => ('' + a.wordString).localeCompare(b.wordString)); // Order list

    // Split by letter
    /* Create an array for each letter and fill it with
     words starting with that letter*/
    this.alphabet.forEach(letter => {
      this.sortedWords[letter] = this.words.filter(word => word.wordString.startsWith(letter));
    });
    /* Iterate over each word and check if the first letter
     is in the alphabet, then add it to the corresponding
     array */
    this.words.forEach(word => {
      const firstLetter = word.wordString.charAt(0).toUpperCase();
      if (this.alphabet.includes(firstLetter)) {
        this.sortedWords[firstLetter].push(word);
      }
    });
  }

  goToDetail(word: Word) {
    this.router.navigate(['app/dictionary/word-details/' + word.idWord], { state: word })
  }

  ionViewWillLeave() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onSearch(event: any) {
    const searchTerm = event.target.value.toLowerCase();

    if (searchTerm === "") {
      this.sortWords(); // Reset to full list of words
    } else {
      this.sortedWords = {};

      // Filter words by searchTerm
      const filteredWords = this.words.filter(word =>
        word.wordString.toLowerCase().includes(searchTerm)
      );

      // Organize words by letter
      filteredWords.forEach(word => {
        const firstLetter = word.wordString.charAt(0).toUpperCase();
        if (!this.sortedWords[firstLetter]) {
          this.sortedWords[firstLetter] = [];
        }
        this.sortedWords[firstLetter].push(word);
      });

      // Navigates to first letter
      const componente = document.getElementById(searchTerm.charAt(0).toUpperCase());

      if (componente != null) {
        componente.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // this.toggleActive(sectionId)
      }
    }
  }

  async openAddUserLanguagesModal() {
    const modal = await this._modalController.create({
      component: ModalUserLanguagesCreateComponent,
      keyboardClose: true,
    });
    return await modal.present();
  }
}
