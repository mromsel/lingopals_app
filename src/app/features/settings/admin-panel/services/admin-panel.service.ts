import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DictionaryApiWordData } from '../dictionary-api/dictionary-api-word-data.interface';
import { Subject } from 'rxjs';
import { Masters } from '../interfaces/masters.interface';
import { WordsRelated } from '../interfaces/words-related.interface';
import { LibreTranslateRequest } from '../libre-translate-api/libre-translate-request.interface';
import { LibreTranslateApiResponse } from '../libre-translate-api/libre-translate-response.interface';
import { Language } from 'src/app/shared/interfaces/language.interface';
import { WordFull } from 'src/app/shared/interfaces/word-full.interface';
import { WordReference } from 'src/app/shared/interfaces/word-reference.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelService {

  dictionaryApiURL = "https://api.dictionaryapi.dev/api/v2/entries/en"
  libreTranslateApiURL = "http://localhost:5000"

  backendURL: string = environment.backendURL
  adminPanelURL = this.backendURL + "/admin-panel"

  masters = new Subject<Masters>();
  mastersStored: Masters | undefined

  wordsRelated = new Subject<WordsRelated>();
  wordsRelatedStored: WordsRelated | undefined

  usersRelated = new Subject<any>();
  usersRelatedStored: any | undefined

  constructor(private http: HttpClient) {
    this.fetchAllMasters()
    this.fetchAllWordsRelated()
    // this.fetchAllUsersRelated()
  }

  fetchAllMasters() {
    this.getMasters().subscribe(
      masters => {
        this.masters.next(masters)
        this.mastersStored = masters
      }
    )
  }

  fetchAllWordsRelated() {
    this.getWordsRelated().subscribe(
      wordsRelated => {
        this.wordsRelated.next(wordsRelated)
        this.wordsRelatedStored = wordsRelated
      }
    )
  }

  fetchAllUsersRelated() {
    this.http.get<any>(`${this.adminPanelURL}/users-related`).subscribe(
      usersRelated => {
        this.usersRelated.next(usersRelated)
        this.usersRelatedStored = usersRelated
      }
    )
  }

  getResource(resource: string) {
    return this.http.get<any>(`${this.backendURL}/${resource}`)
  }

  getWordsByLanguage(isoCode: string) {
    return this.http.get<any>(`${this.backendURL}/words/${isoCode}`)
  }

  getWordDetailsFromDictionaryAPI(word: string) {
    return this.http.get<DictionaryApiWordData[]>(`${this.dictionaryApiURL}/${word}`)
  }

  getMasters() {
    return this.http.get<Masters>(`${this.backendURL}/masters`)
  }

  getWordsRelated() {
    return this.http.get<WordsRelated>(`${this.adminPanelURL}/words-related`)
  }

  translateWithLibreTranslate(libreTranslateRequest: LibreTranslateRequest) {
    return this.http.post<LibreTranslateApiResponse>(`${this.libreTranslateApiURL}/translate`, libreTranslateRequest)
  }

  saveWord(language: Language, wordFull: WordFull) {
    return this.http.post<any>(`${this.backendURL}/words/${language.isoCode}`, wordFull)
  }

  saveWordReference(wordReference: WordReference) {
    return this.http.post<any>(`${this.backendURL}/word-references`, wordReference)
  }
}
