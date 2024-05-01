import { Component, OnDestroy, OnInit } from '@angular/core';
import { MastersService } from '../../services/masters.service';
import { Language } from '../../interfaces/language.interface';
import { ConfigService } from '../../services/config.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-single-language-selector',
  templateUrl: './single-language-selector.component.html',
  styleUrls: ['./single-language-selector.component.scss'],
})
export class SingleLanguageSelectorComponent implements OnInit, OnDestroy {

  unsubscribe$: Subject<void> = new Subject<void>();

  preferredLanguage: Language | undefined;
  languageFlag: string = "../../../../assets/flags/flag_en.png";

  constructor(
    private mastersService: MastersService,
    private configService: ConfigService,
  ) {
  }

  ngOnInit() {
    this.configService.getPreferredLanguageObservable()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        language => {
          this.preferredLanguage = language
          this.languageFlag = "../../../../assets/flags/" + this.preferredLanguage.flag
        }
      )
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}