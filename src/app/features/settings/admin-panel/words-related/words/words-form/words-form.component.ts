import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Word } from 'src/app/shared/interfaces/words-related/word.interface';
import { AdminPanelService } from '../../../services/admin-panel.service';
import { WordReference } from 'src/app/shared/interfaces/words-related/word-reference.interface';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { Language } from 'src/app/shared/interfaces/masters/language.interface';
import { LibreTranslateApiResponse } from '../../../libre-translate-api/libre-translate-response.interface';
import { WordFull } from 'src/app/shared/interfaces/words-related/word-full.interface';

@Component({
  selector: 'app-words-form',
  templateUrl: './words-form.component.html',
  styleUrls: ['./words-form.component.scss'],
})
export class WordsFormComponent implements OnInit {

  private unsubscribe$ = new Subject<void>();
  private unsubscribeOneTime$ = new Subject<void>();

  @Input() wordsList: Word[] = []
  @Input() wordReferences: WordReference[] = []
  availableWordReferences: WordReference[] = []

  wordForm: FormGroup;

  isAdvanced: boolean = false;
  isEditMode: boolean = false;

  languages: Language[] = []
  selectedLanguage: Language | undefined;

  selectedWordReference: WordReference | undefined;

  libreTranslateInput = ""
  libreTranslateResponse: LibreTranslateApiResponse | undefined

  compareWithFn = (o1: Language, o2: Language) => {
    return o1 && o2 ? o1.idLanguage === o2.idLanguage : o1 === o2;
  };

  compareWith = this.compareWithFn;

  constructor(
    private adminPanelService: AdminPanelService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    // Create form
    this.wordForm = this.formBuilder.group({
      wordString: ['', Validators.required],
      definition: ['', Validators.required],
      wordRef: [this.selectedWordReference, Validators.required],
      language: [this.selectedLanguage, Validators.required],
    });

    console.log(this.selectedWordReference);


    let routeParts = this.router.url.split("/")
    if (routeParts[routeParts.length - 1] === "form") {
      this.isAdvanced = true
      this.wordsList = history.state.wordsListToSend;
    }
  }
  ngOnInit() {
    forkJoin({
      wordsRelated: this.adminPanelService.getWordsRelated(),
      masters: this.adminPanelService.getMasters()
    }).subscribe(({ wordsRelated, masters }) => {
      // masters
      this.languages = masters.languages;
      this.selectedLanguage = this.languages[0];
      this.wordForm.controls['language'].setValue(this.selectedLanguage);
      this.getWordsBySelectedLanguage();

      // wordsRelated
      this.wordReferences = wordsRelated.wordReferences;
      this.getAvailableWordReferences();
    });
  }

  getAvailableWordReferences() {
    if (this.wordsList && this.wordReferences) {
      if (this.isEditMode) {
        this.availableWordReferences = [...this.wordReferences]
      } else {
        const wordRefsIds: Set<number> = new Set(this.wordsList.map(word => word.idWordRef));

        const missingWordReferences: WordReference[] = [];

        this.wordReferences.forEach(wordRef => {
          if (!wordRefsIds.has(wordRef.idWordRef)) {
            missingWordReferences.push(wordRef);
          }
        });

        this.availableWordReferences = missingWordReferences
      }
      this.selectedWordReference = this.availableWordReferences[0]
      this.wordForm.controls['wordRef'].setValue(this.selectedWordReference);
      this.libreTranslateResponse = undefined
    }
  }

  onLanguageChange(event: any) {
    const selectedValue = event.detail.value;
    this.selectedLanguage = selectedValue
    this.getWordsBySelectedLanguage();
  }

  onWordReferenceChange(event: any) {
    this.selectedWordReference = event.detail.value;
  }

  private getWordsBySelectedLanguage() {
    if (this.selectedLanguage) {
      this.adminPanelService.getWordsByLanguage(this.selectedLanguage.isoCode)
        .pipe(takeUntil(this.unsubscribeOneTime$))
        .subscribe(data => {
          this.wordsList = data;
          this.getAvailableWordReferences()
          this.unsubscribeOneTime$.next()
        });
    }
  }

  setInputValue(value: string) {
    this.libreTranslateInput = value
  }

  onSubmit() {
    if (this.wordForm?.valid && this.selectedLanguage) {
      const word: WordFull = {
        idWord: this.wordForm.value.wordRef.idWordRef,
        wordReference: this.wordForm.value.wordRef,
        language: this.wordForm.value.language,
        wordString: this.wordForm.value.wordString,
        definition: this.wordForm.value.definition,
      };

      // Submit
      console.log(word);
      this.adminPanelService.saveWord(this.selectedLanguage, word).subscribe(
        response => {
          console.log(response)
          this.getAvailableWordReferences()
          this.getWordsBySelectedLanguage()
        }
      )
    } else {
      // Form not valid
    }
  }

  setWordAndDefinitionValues(event: string) {
    console.log(event)
    let valueParts = event.split(": ")
    this.wordForm.controls['wordString'].setValue(valueParts[0]);
    this.wordForm.controls['definition'].setValue(valueParts[1]);
  }

  changeEditMode() {
    this.isEditMode = !this.isEditMode
    this.getAvailableWordReferences()
  }
}
