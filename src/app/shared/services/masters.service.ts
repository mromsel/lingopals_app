import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Language } from '../interfaces/language.interface';

@Injectable({
  providedIn: 'root'
})
export class MastersService {

  backendURL: string = environment.backendURL

  constructor(private http: HttpClient) { }

  languages: Language[] = []

  fetchBasicMasters() {
    this.http.get<Language[]>(`${this.backendURL}/languages`).subscribe(
      languages => {
        this.languages = languages
        console.log(this.languages)
      }
    )
  }

  fetchMasters() {

  }

  getLanguages(): Language[] {
    return this.languages
  }

}
