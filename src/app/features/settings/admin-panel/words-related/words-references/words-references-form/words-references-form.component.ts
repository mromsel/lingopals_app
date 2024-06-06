import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WordReference } from 'src/app/shared/interfaces/words-related/word-reference.interface';
import { AdminPanelService } from '../../../services/admin-panel.service';
import { Router } from '@angular/router';
import { LanguageLevel } from 'src/app/shared/interfaces/masters/language-level.interface';
import { GrammaticalCategory } from 'src/app/shared/interfaces/masters/grammatical-category.interface';

@Component({
  selector: 'app-words-references-form',
  templateUrl: './words-references-form.component.html',
  styleUrls: ['./words-references-form.component.scss'],
})
export class WordsReferencesFormComponent {

  @Input() data: WordReference[] = []

  wordReferenceForm: FormGroup;
  languageLevels: LanguageLevel[] = []
  grammaticalCategories: GrammaticalCategory[] = []

  isAdvanced: boolean = false;

  constructor(
    private adminPanelService: AdminPanelService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    // Create form
    this.wordReferenceForm = this.formBuilder.group({
      englishWord: ['', Validators.required],
      englishDefinition: ['', Validators.required],
      grammaticalCategory: [Validators.required],
      languageLevel: [Validators.required],
      category: '',
      imageUrl: '',
    });

    let routeParts = this.router.url.split("/")
    if (routeParts[routeParts.length - 1] === "form") {
      this.isAdvanced = true
      this.data = history.state.data;
    }

    this.languageLevels = this.adminPanelService.mastersStored?.languageLevels ?? []
    this.grammaticalCategories = this.adminPanelService.mastersStored?.grammaticalCategories ?? []
    this.wordReferenceForm.controls['languageLevel'].setValue(0);
    this.wordReferenceForm.controls['grammaticalCategory'].setValue(0);

  }

  onSubmit() {
    if (this.wordReferenceForm?.valid) {
      const selectedGrammaticalCategory = this.grammaticalCategories[this.wordReferenceForm.value.grammaticalCategory]
      const selectedLanguageLevel = this.languageLevels[this.wordReferenceForm.value.languageLevel]

      const wordReference: WordReference = {
        idWordRef: 0,
        englishWord: this.wordReferenceForm.value.englishWord,
        englishDefinition: this.wordReferenceForm.value.englishDefinition,
        grammaticalCategory: selectedGrammaticalCategory,
        languageLevel: selectedLanguageLevel,
        // category: this.wordReferenceForm.value.category,
        imageUrl: this.wordReferenceForm.value.imageUrl,
      };

      // Submit
      this.adminPanelService.saveWordReference(wordReference).subscribe(
        response => {
          console.log(response)
        }
      )
    } else {
      // Form not valid
    }
  }

  setEnglishWord(word: string) {
    this.wordReferenceForm.controls['englishWord'].setValue(word);
  }

  setDefinition(definition: string) {
    this.wordReferenceForm.controls['englishDefinition'].setValue(definition);
  }

}
