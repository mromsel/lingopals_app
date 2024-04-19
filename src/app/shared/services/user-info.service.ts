import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserInfo } from '../interfaces/user-info.interface';
import { UserProgress } from '../interfaces/user-progress.interface';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  backendURL: String = environment.backendURL

  constructor(private http: HttpClient) { }

  getUserInfo(idUser: number): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.backendURL}/users/${idUser}`)
  }

  getUserProgress(idUser: number): Observable<UserProgress> {
    return this.http.get<UserProgress>(`${this.backendURL}/users-progress/${idUser}`)
  }
}
