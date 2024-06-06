import { Component, OnInit } from '@angular/core';
import { MastersService } from '../../services/masters.service';
import { Language } from '../../interfaces/language.interface';
import { ConfigService } from '../../services/app/config.service';
import { Subject } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { ModalSingleLanguageSelectorComponent } from './modal-single-language-selector/modal-single-language-selector.component';

@Component({
  selector: 'app-single-language-selector',
  templateUrl: './single-language-selector.component.html',
  styleUrls: ['./single-language-selector.component.scss'],
})
export class SingleLanguageSelectorComponent implements OnInit {

  unsubscribe$: Subject<void> = new Subject<void>();

  preferredLanguage: Language | undefined;
  filePrefix = "../../../../assets/flags/"
  languageFlag: string = "flag_en.png";
  languageFlagSrc = this.filePrefix + this.languageFlag

  constructor(
    private _modalController: ModalController,
    private mastersService: MastersService,
    private configService: ConfigService,
  ) {
  }
  ngOnInit(): void {
    let preferredLanguage = this.configService.preferredLanguage
    if (preferredLanguage) this.setPreferredLanguage(preferredLanguage)

    this.configService.preferredLanguageSubject
      // .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        language => {
          this.setPreferredLanguage(language)
        }
      )
  }

  setPreferredLanguage(language: Language) {
    this.preferredLanguage = language
    this.languageFlag = this.preferredLanguage.flag
    this.languageFlagSrc = this.filePrefix + this.languageFlag
  }

  ionViewWillExit() {
    // this.unsubscribe$.next();
    // this.unsubscribe$.complete();
  }

  async openModal() {
    const modal = await this._modalController.create({
      component: ModalSingleLanguageSelectorComponent,
      keyboardClose: true,
    });
    return await modal.present();
  }

}
