import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { Language } from 'src/app/shared/interfaces/language.interface';
import { ConfigService } from 'src/app/shared/services/config.service';
import { MastersService } from 'src/app/shared/services/masters.service';

@Component({
  selector: 'app-modal-single-language-selector',
  templateUrl: './modal-single-language-selector.component.html',
  styleUrls: ['./modal-single-language-selector.component.scss'],
})
export class ModalSingleLanguageSelectorComponent implements OnInit {

  @Output() languageSelected: Language | undefined;

  @ViewChild(IonModal) modal: IonModal | undefined;

  filePrefix = "../../../../assets/flags/"

  languagesToSelect: Language[] = [];

  constructor(private mastersService: MastersService, private configService: ConfigService) { }

  ngOnInit() {
    this.languagesToSelect = this.mastersService.getLanguages()
  }

  closeModal() {
    this.modal?.dismiss();
  }

  select(i: number) {
    let languageSelected = this.languagesToSelect[i];

    this.languageSelected = languageSelected;

    this.configService.setPreferredLanguage(languageSelected.isoCode)

    this.modal?.dismiss();
  }
}
