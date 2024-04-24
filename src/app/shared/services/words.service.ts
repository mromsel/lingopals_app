import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WordsService {

  backendURL: string = environment.backendURL

  constructor(private http: HttpClient) { }

  getAllWordsByLanguage(idLanguage: number): Observable<any> {
    return this.http.get<any>(`${this.backendURL}/words/${idLanguage}`)
  }
}