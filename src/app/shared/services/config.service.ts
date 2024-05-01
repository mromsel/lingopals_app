import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Language } from '../interfaces/language.interface';
import { MastersService } from './masters.service';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  defaultLocale: string = "en"

  preferredLanguage: Subject<Language> = new Subject<Language>();

  constructor(
    @Inject(LOCALE_ID) public locale: string = "en", private mastersService: MastersService) {
    this.setPreferredLanguage(locale)
  }

  setPreferredLanguage(isoCode: string) {
    console.log("set")
    let preferredLanguage = this.mastersService.getLanguages().filter(language => language.isoCode == isoCode)[0]
    if (preferredLanguage && isoCode != undefined) {
      this.preferredLanguage.next(preferredLanguage)
    } else {
      this.setDefaultLanguage()
    }

  }

  getPreferredLanguageObservable(): Observable<Language> {
    return this.preferredLanguage.asObservable();
  }

  private setDefaultLanguage() {
    this.preferredLanguage.next(this.mastersService.getLanguages().filter(language => language.isoCode == this.defaultLocale)[0])
  }

}
