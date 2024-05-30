import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Language } from '../interfaces/language.interface';
import { LanguageLevel } from '../interfaces/language-level.interface';

@Injectable({
  providedIn: 'root'
})
export class MastersService {

  backendURL: string = environment.backendURL

  constructor(private http: HttpClient) { }

  languages: Language[] = []
  languageLevels: LanguageLevel[] = []

  fetchBasicMasters() {
    this.http.get<Language[]>(`${this.backendURL}/languages`).subscribe(
      languages => {
        this.languages = languages
      }
    )
  }

  fetchMasters() {
    this.http.get<LanguageLevel[]>(`${this.backendURL}/language-levels`).subscribe(
      languageLevels => {
        this.languageLevels = languageLevels
      }
    )
  }

  getLanguages(): Language[] {
    return this.languages
  }

}
