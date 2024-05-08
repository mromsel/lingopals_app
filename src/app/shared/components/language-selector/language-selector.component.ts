import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalLanguageSelectorComponent } from './language-selector-modal/modal-language-selector.component';
import { UserLanguages } from '../../interfaces/user-languages.interface';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent implements OnInit {

  @Input() preferredUserLanguages: UserLanguages | undefined;
  filePrefix = "../../../../assets/flags/"

  originLanguageFlag: string = this.filePrefix + "flag_es.png";
  targetLanguageFlag: string = this.filePrefix + "flag_en.png";

  selectedLanguagesString: string;
  selectedLanguages: UserLanguages | undefined;

  constructor(
    private configService: ConfigService,
    private _modalController: ModalController,
  ) {
    this.selectedLanguagesString = this.preferredUserLanguages?.languageOrigin.isoCode + "." + this.preferredUserLanguages?.languageTarget.isoCode
    this.selectedLanguages = this.preferredUserLanguages
  }

  ngOnInit() {
    this.configService.getPreferredUserLanguages().subscribe(
      preferredUserLanguages => {
        this.preferredUserLanguages = preferredUserLanguages
        this.originLanguageFlag = this.filePrefix + this.preferredUserLanguages.languageOrigin.flag
        this.targetLanguageFlag = this.filePrefix + this.preferredUserLanguages.languageTarget.flag
      }
    )
  }

  async openModal() {
    const modal = await this._modalController.create({
      component: ModalLanguageSelectorComponent,
      componentProps: {
        preferredUserLanguages: this.selectedLanguages,
      },
      keyboardClose: true,
      cssClass: 'small-modal'
    });
    return await modal.present();
  }

}
