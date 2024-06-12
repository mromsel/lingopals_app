import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WordReference } from 'src/app/shared/interfaces/words-related/word-reference.interface';
import { Word } from 'src/app/shared/interfaces/words-related/word.interface';
import { LibreTranslateApiResponse } from '../../../../libre-translate-api/libre-translate-response.interface';
import { Language } from 'src/app/shared/interfaces/masters/language.interface';
import { LibreTranslateRequest } from '../../../../libre-translate-api/libre-translate-request.interface';
import { EventsService } from 'src/app/shared/services/app/events.service';
import { AdminPanelService } from '../../../../services/admin-panel.service';

@Component({
  selector: 'app-words-form-advanced-options',
  templateUrl: './words-form-advanced-options.component.html',
  styleUrls: ['./words-form-advanced-options.component.scss'],
})
export class WordsFormAdvancedOptionsComponent {

  @Input() wordsList: Word[] = []
  @Input() wordReferences: WordReference[] = []
  @Input() selectedWordReference: WordReference | undefined
  @Input() selectedLanguage: Language | undefined

  @Output() wordAndDefinitionValue = new EventEmitter<string>()

  showWordListView = true
  showTranslationBox = false

  libreTranslateInput = ""
  libreTranslateResponse: LibreTranslateApiResponse | undefined

  constructor(
    private eventsService: EventsService,
    private adminPanelService: AdminPanelService,
  ) { }

  switchAdvancedOptionsView() {
    this.showTranslationBox = !this.showTranslationBox
    this.showWordListView = !this.showWordListView
  }

  getLibreTranslateResponse(event: any) {
    console.log(event)
  }

  translateWordReference() {
    this.libreTranslateInput = this.selectedWordReference?.englishWord + ": " + this.selectedWordReference?.englishDefinition

    if (this.libreTranslateInput !== "" && this.selectedLanguage) {
      let libreTranslateRequest: LibreTranslateRequest = {
        q: this.libreTranslateInput,
        source: "en",
        target: this.selectedLanguage?.isoCode
      }
      this.eventsService.showSpinner$.next(true);
      this.adminPanelService.translateWithLibreTranslate(libreTranslateRequest).subscribe(
        {
          next: (response) => {
            console.log(response)
            this.libreTranslateResponse = response
            this.eventsService.showSpinner$.next(false);
          },
          error: () => { this.eventsService.showSpinner$.next(false); }
        }
      )
    }
  }

  setValues() {
    this.wordAndDefinitionValue.emit(this.libreTranslateResponse?.translatedText)
  }
}
