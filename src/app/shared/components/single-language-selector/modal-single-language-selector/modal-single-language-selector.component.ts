import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Language } from 'src/app/shared/interfaces/masters/language.interface';
import { ConfigService } from 'src/app/shared/services/app/config.service';
import { MastersService } from 'src/app/shared/services/masters.service';

@Component({
  selector: 'app-modal-single-language-selector',
  templateUrl: './modal-single-language-selector.component.html',
  styleUrls: ['./modal-single-language-selector.component.scss'],
})
export class ModalSingleLanguageSelectorComponent implements OnInit {

  filePrefix = "../../../../assets/flags/"

  languagesToSelect: Language[] = [];

  preferredIsoCode: string | undefined

  constructor(
    private _modalController: ModalController,
    private translateService: TranslateService,
    private mastersService: MastersService,
    private configService: ConfigService
  ) {
  }

  ngOnInit() {
    this.preferredIsoCode = this.configService.getPreferredIsoCode()
    this.languagesToSelect = this.mastersService.getLanguages()
  }

  select(i: number) {
    let languageSelected = this.languagesToSelect[i];
    if (languageSelected.isoCode == this.preferredIsoCode) {
      this.closeModal()
    } else {
      this.configService.setPreferredLanguage(languageSelected.isoCode)
      this.preferredIsoCode = languageSelected.isoCode
    }
  }

  async closeModal() {
    await this._modalController.dismiss();
  }
}
