import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { UsersLanguages } from 'src/app/shared/interfaces/users-languages.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserInfoService } from 'src/app/shared/services/user-info.service';

@Component({
  selector: 'app-language-selector-modal',
  templateUrl: './language-selector-modal.component.html',
  styleUrls: ['./language-selector-modal.component.scss'],
})
export class LanguageSelectorModalComponent implements OnInit {

  @ViewChild(IonModal) modal: IonModal | undefined;

  languagesToSelect: Array<UsersLanguages> = new Array();

  filePrefix = "../../../../assets/flags/"

  constructor(private userInfoService: UserInfoService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.userInfoService.getUserLanguages(4).subscribe(
      userLanguages => this.languagesToSelect = userLanguages
    )
    console.log(this.languagesToSelect)
  }

  closeModal() {
    this.modal?.dismiss();
  }

  select(i: number) {
    let languagesSelected = this.languagesToSelect[i];

    // this.selectedLanguages = languagesSelected.languageOrigin.isoCode + "." + languagesSelected.languageTarget.isoCode

    // this.originLanguageFlag = this.filePrefix + languagesSelected.languageOrigin.flag
    // this.destinyLanguageFlag = this.filePrefix + languagesSelected.languageTarget.flag

    this.modal?.dismiss();
  }
}
