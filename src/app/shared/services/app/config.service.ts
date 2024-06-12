import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Language } from '../../interfaces/masters/language.interface';
import { MastersService } from '../masters.service';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { UserLanguages } from '../../interfaces/user-related/user-languages.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  prefLangKey = "pref-lang"

  defaultLocale: string = "en"

  preferredLanguageSubject: Subject<Language> = new Subject<Language>();
  preferredLanguage: Language | undefined

  preferredIsoCode: string = this.defaultLocale

  preferredUserLanguagesSubject: Subject<UserLanguages> = new Subject<UserLanguages>();
  preferredUserLanguages: UserLanguages | undefined

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
      this.preferredLanguageSubject.next(preferredLanguage)
      this.preferredLanguage = preferredLanguage
      console.log(preferredLanguage);

    } else {
      this.setDefaultLanguage()
    }
  }

  private setDefaultLanguage() {
    localStorage.setItem(this.prefLangKey, this.defaultLocale)
    this.translateService.use(this.defaultLocale);

    let preferredLanguage = this.mastersService.getLanguages().filter(language => language.isoCode == this.defaultLocale)[0]
    this.preferredLanguageSubject.next(preferredLanguage)
    this.preferredLanguage = preferredLanguage
  }

  getPreferredIsoCode(): string {
    if (this.preferredIsoCode) return this.preferredIsoCode

    let storaged: string | null = localStorage.getItem("pref-lang")
    if (storaged) {
      this.preferredIsoCode = storaged
      let preferredLanguage = this.mastersService.getLanguages().filter(lang => lang.isoCode == this.preferredIsoCode)[0]
      this.preferredLanguageSubject.next(preferredLanguage)
      this.preferredLanguage = preferredLanguage
      return storaged
    }
    return this.defaultLocale
  }

  setPreferredUserLanguages(userLanguages: UserLanguages) {
    this.preferredUserLanguages = userLanguages
    this.preferredUserLanguagesSubject.next(this.preferredUserLanguages)
  }
}
