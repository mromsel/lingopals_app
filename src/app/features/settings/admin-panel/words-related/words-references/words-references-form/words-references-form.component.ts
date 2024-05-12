import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WordReference } from 'src/app/shared/interfaces/word-reference.interface';

@Component({
  selector: 'app-words-references-form',
  templateUrl: './words-references-form.component.html',
  styleUrls: ['./words-references-form.component.scss'],
})
export class WordsReferencesFormComponent {

  wordReferenceForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    // Create form
    this.wordReferenceForm = this.formBuilder.group({
      englishWord: ['', Validators.required],
      imageUrl: '',
      languageLevel: ['', Validators.required],
      category: ''
    });
  }

  onSubmit() {
    if (this.wordReferenceForm?.valid) {
      const wordReference: WordReference = {
        idWordRef: 0,
        englishWord: this.wordReferenceForm.value.englishWord,
        imageUrl: this.wordReferenceForm.value.imageUrl,
        languageLevel: this.wordReferenceForm.value.languageLevel,
        category: this.wordReferenceForm.value.category
      };

      // Submit
      console.log(wordReference);
    } else {
      // Form not valid
    }
  }
}
