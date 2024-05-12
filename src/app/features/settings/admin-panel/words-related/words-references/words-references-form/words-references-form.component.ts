import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WordReference } from 'src/app/shared/interfaces/word-reference.interface';
import { AdminPanelService } from '../../../services/admin-panel.service';
import { DictionaryApiWordData } from '../../../dictionary-api/dictionary-api-word-data.interface';

@Component({
  selector: 'app-words-references-form',
  templateUrl: './words-references-form.component.html',
  styleUrls: ['./words-references-form.component.scss'],
})
export class WordsReferencesFormComponent {

  wordReferenceForm: FormGroup;

  wordDetails: DictionaryApiWordData | undefined;

  constructor(
    private adminPanelService: AdminPanelService,
    private formBuilder: FormBuilder
  ) {
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

  findWord() {
    // let word = this.wordReferenceForm.value.englishWord;
    let word = "hello"; // DEBUG
    this.adminPanelService.getWordDetailsFromDictionaryAPI(word).subscribe(
      word => {
        console.log(word)
        this.wordDetails = word[0]
      }
    )
  }
}
