import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DictionaryApiWordData } from './dictionary-api-word-data.interface';
import { AdminPanelService } from '../services/admin-panel.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dictionary-api',
  templateUrl: './dictionary-api.component.html',
  styleUrls: ['./dictionary-api.component.scss'],
})
export class DictionaryApiComponent implements OnInit {

  @Input() dictionaryApiWordData: DictionaryApiWordData | undefined
  @Output() wordReferenceWordString = new EventEmitter<string>;
  @Output() wordReferenceDefinition = new EventEmitter<string>;

  unsubscribe$: Subject<void> = new Subject<void>();

  searchedWord: string = "dog"

  constructor(
    private adminPanelService: AdminPanelService,
  ) { }

  ngOnInit() {
    // this.findWord()
  }

  findWord() {
    let word = this.searchedWord;
    // let word = "hello"; // DEBUG
    this.adminPanelService.getWordDetailsFromDictionaryAPI(word)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        word => {
          console.log(word)
          this.dictionaryApiWordData = word[0]
          this.unsubscribe$.next()
        }
      )
  }

  setWord(word: string) {
    console.log("set word to: " + word)
    this.wordReferenceWordString.next(word)
  }

  setDefinition(definition: string) {
    this.wordReferenceDefinition.next(definition)
  }
}
