import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalLanguageSelectorComponent } from './language-selector-modal/modal-language-selector.component';
import { UserLanguages } from '../../interfaces/user-languages.interface';
import { ConfigService } from '../../services/config.service';
import { UserInfoService } from '../../services/user-info.service';

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

  selectedLanguagesString: string | undefined;
  selectedLanguages: UserLanguages | undefined;

  listUserLanguages: UserLanguages[] = []

  constructor(
    private userInfoService: UserInfoService,
    private configService: ConfigService,
    private _modalController: ModalController,
  ) {
  }

  ngOnInit() {
    this.userInfoService.getUserLanguages().subscribe(
      userLanguages => {
        this.preferredUserLanguages = userLanguages.filter(userLanguages => userLanguages.preferred)[0]
        this.originLanguageFlag = this.filePrefix + this.preferredUserLanguages.languageOrigin.flag
        this.targetLanguageFlag = this.filePrefix + this.preferredUserLanguages.languageTarget.flag
      }
    )
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
        userLanguagesToSelect: this.listUserLanguages,
      },
      keyboardClose: true,
      cssClass: 'small-modal'
    });
    return await modal.present();
  }

}
