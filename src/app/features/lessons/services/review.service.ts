import { Injectable } from '@angular/core';
import { UserLanguages } from 'src/app/shared/interfaces/user-languages.interface';
import { ReviewWords } from '../interfaces/review-words.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  backendURL: string = environment.backendURL

  constructor(private http: HttpClient) { }

  getReviewWords(idUser: number, userLanguages: UserLanguages): Observable<ReviewWords> {
    return this.http.get<ReviewWords>(`${this.backendURL}/review-words/${idUser}/${userLanguages.languageOrigin.isoCode}/${userLanguages.languageTarget.isoCode}`)
  }
}
