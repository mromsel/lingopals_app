import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserLogin } from '../interfaces/user-login';
import { UserSignUp } from '../interfaces/user-signup.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isUserLogged = new BehaviorSubject<boolean>(false);
  private idUser: number = 0;

  backendURL: string = environment.backendURL

  constructor(private http: HttpClient) { }

  login(userToLog: UserLogin): Observable<any> {
    return this.http.post<UserLogin>(`${this.backendURL}/users/login`, userToLog)
  }

  logout() {
    this.isUserLogged.next(false);
    localStorage.removeItem("token");
    this.idUser = 0;
  }

  isLoggedIn(): Observable<boolean> {
    return this.isUserLogged.asObservable();
  }

  isLoggedInValue(): boolean {
    return this.isUserLogged.getValue();
  }

  getIdUser(): number {
    return this.idUser;
  }

  setIsUserLogged(value: boolean) {
    this.isUserLogged.next(value);
  }

  setIdUser(idUser: number) {
    this.idUser = idUser;
  }

  signup(userSignUp: UserSignUp) {
    return this.http.post<any>(`${this.backendURL}/users/signup`, userSignUp)
  }
}
