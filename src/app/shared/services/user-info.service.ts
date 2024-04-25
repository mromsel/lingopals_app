import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserInfo } from '../interfaces/user-info.interface';
import { UserProgress } from '../interfaces/user-progress.interface';
import { UsersLanguages } from '../interfaces/users-languages.interface';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  backendURL: string = environment.backendURL

  idUser: number | undefined;

  private userLanguages: UsersLanguages[] = [];

  constructor(private http: HttpClient) {
    let localStorageIdUser = localStorage.getItem("idUser")
    console.log(localStorageIdUser)
    this.idUser = localStorageIdUser ? +localStorageIdUser : undefined

    this.fetchData()
  }

  getUserInfo(idUser: number): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.backendURL}/users/${idUser}`)
  }

  getUserProgress(idUser: number): Observable<UserProgress> {
    return this.http.get<UserProgress>(`${this.backendURL}/users-progress/${idUser}`)
  }

  getUserLanguages(): UsersLanguages[] {
    return this.userLanguages
  }

  setIdUser(idUser: number) {
    this.idUser = idUser
  }

  fetchData() {
    this.http.get<UsersLanguages[]>(`${this.backendURL}/users-languages/${this.idUser}`).subscribe(userLanguages => {
      this.userLanguages = userLanguages
    })
  }
}
