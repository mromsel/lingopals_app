import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserLanguages } from 'src/app/shared/interfaces/user-related/user-languages.interface';
import { ConfigService } from 'src/app/shared/services/app/config.service';
import { UserInfoService } from 'src/app/shared/services/user-related/user-info.service';
import { ModalUserLanguagesCreateComponent } from '../../modal-user-languages-create/modal-user-languages-create.component';

@Component({
  selector: 'app-language-selector-modal',
  templateUrl: './modal-language-selector.component.html',
  styleUrls: ['./modal-language-selector.component.scss'],
})
export class ModalLanguageSelectorComponent {

  userLanguagesToSelect: UserLanguages[] = []

  preferredUserLanguages: UserLanguages | undefined
  preferredIndex: number = 0

  filePrefix = "../../../../assets/flags/"

  base64Prefix = "data:image/png;base64,"

  constructor(
    private _modalController: ModalController,
    private userInfoService: UserInfoService,
    private configService: ConfigService,
  ) {
  }

  ionViewWillEnter() {
    this.userLanguagesToSelect = this.userInfoService.userLanguages

    this.preferredUserLanguages = this.userLanguagesToSelect.filter(userLanguages => userLanguages.preferred)[0]

    this.preferredIndex = this.userLanguagesToSelect.findIndex(userLanguages => userLanguages.preferred)
  }

  select(i: number) {
    let languagesSelected = this.userLanguagesToSelect[i];

    if (this.preferredIndex == i) {
      this.closeModal()
    } else {
      this.configService.setPreferredUserLanguages(languagesSelected)
      this.userInfoService.changePreferredUserLanguages(languagesSelected)
      this.preferredIndex = i
    }
  }

  async closeModal() {
    await this._modalController.dismiss();
  }

  async openAddUserLanguagesModal() {
    const modal = await this._modalController.create({
      component: ModalUserLanguagesCreateComponent,
      keyboardClose: true,
      // cssClass: 'small-modal'
    });
    return await modal.present();
  }
}
