import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalLanguageSelectorComponent } from './language-selector-modal/modal-language-selector.component';
import { UserLanguages } from '../../interfaces/user-languages.interface';
import { ConfigService } from '../../services/app/config.service';
import { UserInfoService } from '../../services/user-related/user-info.service';
import { ModalUserLanguagesCreateComponent } from '../modal-user-languages-create/modal-user-languages-create.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent implements OnInit, OnDestroy {

  unsubscribe$: Subject<void> = new Subject<void>();

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
    let userLanguages = this.userInfoService.userLanguages
    if (userLanguages && userLanguages.length > 0) {
      this.preferredUserLanguages = userLanguages.filter(userLanguages => userLanguages.preferred)[0]
      this.originLanguageFlag = this.filePrefix + this.preferredUserLanguages.languageOrigin.flag
      this.targetLanguageFlag = this.filePrefix + this.preferredUserLanguages.languageTarget.flag

      this.preferredUserLanguages = this.configService.preferredUserLanguages
      if (this.preferredUserLanguages) {
        this.originLanguageFlag = this.filePrefix + this.preferredUserLanguages.languageOrigin.flag
        this.targetLanguageFlag = this.filePrefix + this.preferredUserLanguages.languageTarget.flag
      }

      this.configService.preferredUserLanguagesSubject
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          preferredUserLanguages => {
            this.preferredUserLanguages = preferredUserLanguages
            if (this.preferredUserLanguages) {
              this.originLanguageFlag = this.filePrefix + this.preferredUserLanguages.languageOrigin.flag
              this.targetLanguageFlag = this.filePrefix + this.preferredUserLanguages.languageTarget.flag
            }
          }
        )
    } else {
      this.openAddUserLanguagesModal()
    }
  }

  async openModal() {
    const modal = await this._modalController.create({
      component: ModalLanguageSelectorComponent,
      componentProps: {
        userLanguagesToSelect: this.listUserLanguages,
      },
      keyboardClose: true,
    });
    return await modal.present();
  }

  async openAddUserLanguagesModal() {
    const modal = await this._modalController.create({
      component: ModalUserLanguagesCreateComponent,
      keyboardClose: true,
    });
    return await modal.present();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
