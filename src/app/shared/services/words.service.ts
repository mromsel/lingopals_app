import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Word } from '../interfaces/word.interface';

@Injectable({
  providedIn: 'root'
})
export class WordsService {

  backendURL: string = environment.backendURL

  constructor(private http: HttpClient) { }

  getAllWordsByLanguage(isoCode: string): Observable<Word[]> {
    return this.http.get<any>(`${this.backendURL}/words/${isoCode}`)
  }
}
