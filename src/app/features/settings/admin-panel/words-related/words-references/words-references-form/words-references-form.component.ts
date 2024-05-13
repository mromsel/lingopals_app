import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WordReference } from 'src/app/shared/interfaces/word-reference.interface';
import { AdminPanelService } from '../../../services/admin-panel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-words-references-form',
  templateUrl: './words-references-form.component.html',
  styleUrls: ['./words-references-form.component.scss'],
})
export class WordsReferencesFormComponent {

  @Input() data: WordReference[] = []

  wordReferenceForm: FormGroup;

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
      grammaticalCategory: '',
      languageLevel: ['', Validators.required],
      category: '',
      imageUrl: '',
    });

    let routeParts = this.router.url.split("/")
    if (routeParts[routeParts.length - 1] === "form") {
      this.isAdvanced = true
      this.data = history.state.data;
    }
  }

  onSubmit() {
    if (this.wordReferenceForm?.valid) {
      const wordReference: WordReference = {
        idWordRef: 0,
        englishWord: this.wordReferenceForm.value.englishWord,
        englishDefinition: this.wordReferenceForm.value.englishDefinition,
        grammaticalCategory: this.wordReferenceForm.value.grammaticalCategory,
        languageLevel: this.wordReferenceForm.value.languageLevel,
        category: this.wordReferenceForm.value.category,
        imageUrl: this.wordReferenceForm.value.imageUrl,
      };

      // Submit
      console.log(wordReference);
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