import { Component, Input, OnInit } from '@angular/core';
import { Language } from '../../interfaces/language.interface';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent implements OnInit {

  @Input() languageOrigin: Language | undefined;
  @Input() languageDestiny: Language | undefined;

  constructor() { }

  ngOnInit() { }

}
