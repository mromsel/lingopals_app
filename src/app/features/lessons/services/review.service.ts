import { Injectable } from '@angular/core';
import { UserLanguages } from 'src/app/shared/interfaces/user-related/user-languages.interface';
import { ReviewWords } from '../interfaces/review-words.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { backendURL } from 'src/app/shared/utils/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  backendURL: string = backendURL

  constructor(private http: HttpClient) { }

  getReviewWords(userLanguages: UserLanguages): Observable<ReviewWords> {
    return this.http.get<ReviewWords>(`${this.backendURL}/review-words/${userLanguages.idUserLanguages}`)
  }
}
