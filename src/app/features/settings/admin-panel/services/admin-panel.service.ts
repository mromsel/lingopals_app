import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DictionaryApiWordData } from '../dictionary-api/dictionary-api-word-data.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelService {

  dictionaryApiURL = "https://api.dictionaryapi.dev/api/v2/entries/en"

  backendURL: string = environment.backendURL

  masters = new Subject<any[]>();

  mastersStored: any[] = []

  constructor(private http: HttpClient) { }

  fetchAllMasters() {
    this.http.get<any>(`${this.backendURL}/masters`).subscribe(
      masters => {
        this.masters.next(masters)
        this.mastersStored = masters
      }
    )
  }

  getResource(resource: string) {
    return this.http.get<any>(`${this.backendURL}/${resource}`)
  }

  getWordDetailsFromDictionaryAPI(word: string) {
    return this.http.get<DictionaryApiWordData[]>(`${this.dictionaryApiURL}/${word}`)
  }
}
