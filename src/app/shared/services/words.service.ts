import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Word } from '../interfaces/words-related/word.interface';
import { backendURL } from '../utils/environment';

@Injectable({
  providedIn: 'root'
})
export class WordsService {

  backendURL: string = backendURL

  constructor(private http: HttpClient) { }

  getAllWordsByLanguage(isoCode: string): Observable<Word[]> {
    return this.http.get<any>(`${this.backendURL}/words/${isoCode}`)
  }

  getWordByLanguageAndID(isoCode: string, idWord: number) {
    return this.http.get<any>(`${this.backendURL}/words/${isoCode}/ids/${idWord}`)
  }
}
