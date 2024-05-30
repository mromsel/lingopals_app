import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MastersService } from '../../services/masters.service';
import { Language } from '../../interfaces/language.interface';
import { UserInfoService } from '../../services/user-info.service';
import { UserLanguagesCreate } from './user-languages-create.interface';
import { LanguageLevel } from '../../interfaces/language-level.interface';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-modal-user-languages-create',
  templateUrl: './modal-user-languages-create.component.html',
  styleUrls: ['./modal-user-languages-create.component.scss'],
})
export class ModalUserLanguagesCreateComponent implements OnInit {

  filePrefix = "../../../../assets/flags/"

  languagesToSelect: Language[] = []
  languageLevelsToSelect: LanguageLevel[] = []

  // languageOriginIndex: number | undefined
  // languageTargetIndex: number | undefined

  languageOrigin: Language | undefined
  languageTarget: Language | undefined

  languageLevelSelectedIndex: number = 0

  setPreferred = true

  constructor(
    private _modalController: ModalController,
    private mastersService: MastersService,
    private userInfoService: UserInfoService,
    private configService: ConfigService,
  ) { }

  ngOnInit() {
    this.languagesToSelect = this.mastersService.getLanguages()
    console.log(this.languagesToSelect);

    this.languageLevelsToSelect = this.mastersService.languageLevels
  }

  selectLanguage(index: number) {
    console.log(index);

    let languageSelected = this.languagesToSelect[index]

    if (!this.languageOrigin) {
      this.languageOrigin = languageSelected
      // this.languageOriginIndex = index;
      // console.log(this.languageOriginIndex);
    } else if (!this.languageTarget && languageSelected.idLanguage != this.languageOrigin.idLanguage) {
      this.languageTarget = languageSelected
      // this.languageTargetIndex = index;
      // console.log(this.languageTargetIndex);
    }
  }

  createUserLanguages() {
    let idUser = this.userInfoService.idUser

    if (this.languageOrigin && this.languageTarget && idUser !== undefined) {
      let userLanguagesToCreate: UserLanguagesCreate = {
        idUser: idUser,
        languageOrigin: this.languageOrigin,
        languageTarget: this.languageTarget,
        languageLevel: this.languageLevelsToSelect[this.languageLevelSelectedIndex],
        setPreferred: this.setPreferred
      }

      console.log(userLanguagesToCreate)
      this.userInfoService.createNewUserLanguages(userLanguagesToCreate).subscribe(
        userLanguages => {
          this.userInfoService.userLanguages = userLanguages
          this.configService.setPreferredUserLanguages(userLanguages.filter(userLanguages => userLanguages.preferred)[0])
        }
      )
    }
  }

  selectLanguageLevel(event: any) {
    this.languageLevelSelectedIndex = event.target.value;
    console.log(this.languageLevelSelectedIndex);

  }

  clearSelection() {
    // this.languageOriginIndex = undefined
    // this.languageTargetIndex = undefined
    this.languageOrigin = undefined
    this.languageTarget = undefined
    this.languageLevelSelectedIndex = 0
    this.setPreferred = false
  }

  changeSetPreferred() {
    this.setPreferred = !this.setPreferred
  }

  async closeModal() {
    await this._modalController.dismiss();
  }
}
