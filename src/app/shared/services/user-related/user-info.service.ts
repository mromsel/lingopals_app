import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserLanguages } from '../../interfaces/user-languages.interface';
import { ConfigService } from '../app/config.service';
import { UserLanguagesCreate } from '../../components/modal-user-languages-create/user-languages-create.interface';
import { UserProgress } from '../../interfaces/user-progress.interface';
import { User } from '../../interfaces/user.interface';
import { LocalStorageService } from '../app/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  backendURL: string = environment.backendURL

  idUser: number | undefined;

  userLanguages: UserLanguages[] = [];
  user: User | undefined;
  userProgress: UserProgress | undefined;

  constructor(
    private configService: ConfigService,
    private localStorageService: LocalStorageService,
    private http: HttpClient
  ) {
    if (this.localStorageService.getItem(this.localStorageService.TOKEN_KEY)) {
      this.fetchData()
    }
  }

  getUserInfo(idUser: number): Observable<User> {
    return this.http.get<User>(`${this.backendURL}/users/${idUser}`)
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
    this.http.post<any>(`${this.backendURL}/me`, { token: this.localStorageService.getItem(this.localStorageService.TOKEN_KEY) }).subscribe({
      next: userInfo => {
        this.userProgress = userInfo.userProgressData
        this.user = this.userProgress?.user
        this.userLanguages = userInfo.userLanguages

        if (this.user?.preferredLanguage) {
          this.configService.setPreferredLanguage(this.user.preferredLanguage.isoCode)
        }

        let preferredUserLanguages: UserLanguages | undefined = this.userLanguages.filter(userLanguages => userLanguages.preferred)[0]
        if (preferredUserLanguages) {
          this.configService.setPreferredUserLanguages(preferredUserLanguages)
        } else {
          this.configService.setPreferredUserLanguages(this.userLanguages[0])
        }
      },
      error: (error) => {
        console.log(error)
      }
    }
    )
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
