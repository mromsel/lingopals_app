import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Language } from '../interfaces/language.interface';
import { MastersService } from './masters.service';
import { Observable, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { UserLanguages } from '../interfaces/user-languages.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  prefLangKey = "pref-lang"

  defaultLocale: string = "en"

  preferredLanguage: Subject<Language> = new Subject<Language>();

  preferredIsoCode: string = this.defaultLocale

  preferredUserLanguages: Subject<UserLanguages> = new Subject<UserLanguages>();

  constructor(
    @Inject(LOCALE_ID) public locale: string, private translateService: TranslateService, private mastersService: MastersService) {
    this.setPreferredLanguage(this.getPreferredIsoCode())
  }

  setPreferredLanguage(isoCode: string) {
    let preferredLanguage = this.mastersService.getLanguages().filter(language => language.isoCode == isoCode)[0]
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
    if (this.preferredIsoCode) return this.preferredIsoCode

    let storaged: string | null = localStorage.getItem("pref-lang")
    if (storaged) {
      this.preferredIsoCode = storaged
      this.preferredLanguage.next(this.mastersService.getLanguages().filter(lang => lang.isoCode == this.preferredIsoCode)[0])
      return storaged
    }
    return this.defaultLocale
  }

  getPreferredUserLanguages(): Observable<UserLanguages> {
    return this.preferredUserLanguages.asObservable()
  }

  setPreferredUserLanguages(userLanguages: UserLanguages) {
    this.preferredUserLanguages.next(userLanguages)
  }
}
