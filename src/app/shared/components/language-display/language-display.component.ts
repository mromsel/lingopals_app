import { Component, Input, OnInit } from '@angular/core';
import { Language } from '../../interfaces/masters/language.interface';

@Component({
  selector: 'app-language-display',
  templateUrl: './language-display.component.html',
  styleUrls: ['./language-display.component.scss'],
})
export class LanguageDisplayComponent implements OnInit {

  @Input() language!: Language;
  @Input() selected: boolean = false;
  @Input() nameDisplay: boolean = false;

  filePrefix = "../../../../assets/flags/flag_"

  constructor() {
    // console.log(this.language.flag.imageBase64);

  }

  ngOnInit() { }

}
