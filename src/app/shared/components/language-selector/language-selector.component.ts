import { Component, Input, OnInit } from '@angular/core';
import { Language } from '../../interfaces/language.interface';
import { UserInfoService } from '../../services/user-info.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent implements OnInit {

  @Input() languageOrigin: Language | undefined;
  @Input() languageDestiny: Language | undefined;

  filePrefix = "../../../../assets/flags/"

  originLanguageFlag: string = "../../../../assets/flags/flag_es.png";
  destinyLanguageFlag: string = "../../../../assets/flags/flag_en.png";

  selectedLanguages: string;

  constructor(private userInfoService: UserInfoService,
    private authService: AuthService
  ) {
    this.selectedLanguages = this.languageOrigin?.isoCode + "." + this.languageDestiny?.isoCode
  }

  ngOnInit() {

  }

}
