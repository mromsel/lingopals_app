import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserInfo } from '../interfaces/user-info.interface';
import { UserProgress } from '../interfaces/user-progress.interface';
import { UserLanguages } from '../interfaces/user-languages.interface';
import { ConfigService } from './config.service';
import { UserLanguagesCreate } from '../components/modal-user-languages-create/user-languages-create.interface';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  backendURL: string = environment.backendURL

  idUser: number | undefined;

  userLanguages: UserLanguages[] = [];
  userInfo: UserInfo | undefined;
  userProgress: UserProgress | undefined;

  constructor(
    private configService: ConfigService,
    private http: HttpClient
  ) {
    let localStorageIdUser = localStorage.getItem("idUser")
    this.idUser = localStorageIdUser ? +localStorageIdUser : undefined

    if (this.idUser) {
      this.fetchData()
    }
  }

  getUserInfo(idUser: number): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.backendURL}/users/${idUser}`)
  }

  getUserProgress(idUser: number): Observable<UserProgress> {
    return this.http.get<UserProgress>(`${this.backendURL}/users-progress/${idUser}`)
  }

  getUserLanguages(): Observable<UserLanguages[]> {
    return this.http.get<UserLanguages[]>(`${this.backendURL}/users-languages/${this.idUser}`)
  }

  setIdUser(idUser: number) {
    this.idUser = idUser
  }

  fetchData() {
    if (this.idUser) {
      this.getUserInfo(this.idUser).subscribe(userInfo => {
        this.userInfo = userInfo
        if (this.userInfo.preferredLanguage) {
          this.configService.setPreferredLanguage(this.userInfo.preferredLanguage.isoCode)
        }
      })
      this.getUserProgress(this.idUser).subscribe(userProgress => this.userProgress = userProgress)
    }

    this.http.get<UserLanguages[]>(`${this.backendURL}/users-languages/${this.idUser}`).subscribe(userLanguages => {
      this.userLanguages = userLanguages
      let preferredUserLanguages: UserLanguages | undefined = this.userLanguages.filter(userLanguages => userLanguages.preferred)[0]
      if (preferredUserLanguages) {
        this.configService.setPreferredUserLanguages(preferredUserLanguages)
      } else {
        this.configService.setPreferredUserLanguages(this.userLanguages[0])
      }
    })
  }

  changePreferredUserLanguages(newUserLanguages: UserLanguages) {
    this.http.post<UserLanguages[]>(`${this.backendURL}/users-languages/change-preferred`, newUserLanguages)
      .subscribe(userLanguages => {
        this.userLanguages = userLanguages
        this.configService.setPreferredUserLanguages(userLanguages.filter(userLanguages => userLanguages.preferred)[0])
      })
  }

  createNewUserLanguages(userLanguagesCreate: UserLanguagesCreate) {
    return this.http.post<UserLanguages[]>(`${this.backendURL}/users-languages`, userLanguagesCreate)
  }
}
