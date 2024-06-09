import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchbarChangeEventDetail } from '@ionic/angular';
import { IonSearchbarCustomEvent } from '@ionic/core';
import { Word } from 'src/app/shared/interfaces/words-related/word.interface';
import { AdminPanelService } from '../../services/admin-panel.service';
import { Language } from 'src/app/shared/interfaces/masters/language.interface';
import { Subject, takeUntil } from 'rxjs';
import { WordReference } from 'src/app/shared/interfaces/words-related/word-reference.interface';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss'],
})
export class WordsComponent implements OnInit {

  private unsubscribe$ = new Subject<void>();
  private unsubscribeOneTime$ = new Subject<void>();

  routeToNavigateOnAdvancedSearch = 'app/settings/admin-panel/words-related/words/form'

  showForm: boolean = false;
  showSearchBar: boolean = false;

  wordsList: any[] = []
  displayedColumns: string[] = []; //Object.keys(this.data[0])
  displayList: Word[] = [];

  languages: Language[] = []
  selectedLanguage: Language | undefined;

  wordReferences: WordReference[] = []

  compareWithFn = (o1: Language, o2: Language) => {
    return o1 && o2 ? o1.idLanguage === o2.idLanguage : o1 === o2;
  };

  compareWith = this.compareWithFn;

  constructor(
    private adminPanelService: AdminPanelService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.adminPanelService.fetchAllMasters();
    this.adminPanelService.masters
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        data => {
          this.languages = data.languages;
          this.selectedLanguage = this.languages[0];
          this.getWordsBySelectedLanguage();
        }
      );

    this.adminPanelService.wordsRelated
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        wordsRelated => {
          this.wordReferences = wordsRelated.wordReferences
          console.log(this.wordReferences);
        }
      );
  }

  onLanguageChange() {
    this.getWordsBySelectedLanguage();
  }

  private getWordsBySelectedLanguage() {
    if (this.selectedLanguage) {
      this.adminPanelService.getWordsByLanguage(this.selectedLanguage.isoCode)
        .pipe(takeUntil(this.unsubscribeOneTime$))
        .subscribe(data => {
          this.wordsList = data;
          this.displayList = data;
          this.displayedColumns = Object.keys(this.wordsList[0]);
          this.unsubscribeOneTime$.next()
        });
    }
  }

  toggleShowForm() {
    this.showForm = !this.showForm
    if (this.showForm) {
      this.showSearchBar = false
    }
  }

  toggleShowSearchBar() {
    this.showSearchBar = !this.showSearchBar
    if (this.showSearchBar) {
      this.showForm = false
    }
  }

  goToAdvancedForm() {
    let wordsListToSend = this.wordsList
    this.router.navigate([this.routeToNavigateOnAdvancedSearch], { state: { wordsListToSend } });
  }

  deleteWord(word: Word) {
    console.log("deleting: ")
    console.log(word);
  }

  onSearch($event: IonSearchbarCustomEvent<SearchbarChangeEventDetail>) {
    throw new Error('Method not implemented.');
  }

  onViewWillExit() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
