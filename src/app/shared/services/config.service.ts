import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Language } from '../interfaces/language.interface';
import { MastersService } from './masters.service';
import { Observable, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  prefLangKey = "pref-lang"

  defaultLocale: string = "en"

  preferredLanguage: Subject<Language> = new Subject<Language>();

  preferredIsoCode: string = this.defaultLocale

  constructor(
    @Inject(LOCALE_ID) public locale: string, private translateService: TranslateService, private mastersService: MastersService) {
    let storageLang = localStorage.getItem(this.prefLangKey)
    if (storageLang) {
      this.preferredIsoCode = storageLang
      this.setPreferredLanguage(this.preferredIsoCode)
    } else {
      this.setDefaultLanguage()
    }
  }

  setPreferredLanguage(isoCode: string) {
    let preferredLanguage = this.mastersService.getLanguages().filter(language => language.isoCode == isoCode)[0]
    console.log(preferredLanguage)
    if (preferredLanguage && isoCode != undefined && this.preferredIsoCode != null) {
      this.preferredIsoCode = preferredLanguage.isoCode
      localStorage.setItem(this.prefLangKey, this.preferredIsoCode)
      this.translateService.use(this.preferredIsoCode);
      this.preferredLanguage.next(preferredLanguage)
    } else {
      this.setDefaultLanguage()
    }
  }

  private setDefaultLanguage() {
    localStorage.setItem(this.prefLangKey, this.defaultLocale)
    this.translateService.use(this.defaultLocale);
    this.preferredLanguage.next(this.mastersService.getLanguages().filter(language => language.isoCode == this.defaultLocale)[0])
  }

  getPreferredLanguageObservable(): Observable<Language> {
    return this.preferredLanguage.asObservable();
  }

  getPreferredIsoCode(): string {
    return this.preferredIsoCode ?? this.defaultLocale
  }

}
