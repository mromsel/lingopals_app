import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserLogin } from '../interfaces/auth/user-login.interface';
import { UserSignUp } from '../interfaces/auth/user-signup.interface';
import { LocalStorageService } from '../services/app/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentToken: BehaviorSubject<string> = new BehaviorSubject<string>("");

  private isUserLogged = new BehaviorSubject<boolean>(false);
  private idUser: number = 0;

  private token: string = ""

  backendURL: string = environment.backendURL

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
  ) {
    this.currentUserLoginOn = new BehaviorSubject<boolean>(this.localStorageService.getItem(this.localStorageService.TOKEN_KEY) != null)
    // console.log((this.localStorageService.TOKEN_KEY))

    this.currentToken = new BehaviorSubject<string>(this.localStorageService.getItem(this.localStorageService.TOKEN_KEY) ?? "")
    // console.log(this.currentToken);

  }

  login(userToLog: UserLogin): Observable<any> {
    // return this.http.post<UserLogin>(`${this.backendURL}/auth/login`, userToLog)

    return this.http.post<any>(this.backendURL + "/auth/login", userToLog)
      .pipe(
        tap((response) => {
          this.localStorageService.setItem(this.localStorageService.TOKEN_KEY, response.token)
          // sessionStorage.setItem("token", response.token);
          this.currentToken.next(response.token);
          this.currentUserLoginOn.next(true);
        }),
        map((response) => response.token),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producio un error ', error.error);
    }
    else {
      console.error('Backend retornó el código de estado ', error);
    }
    return throwError(() => new Error('Algo falló. Por favor intente nuevamente.'));
  }

  logout() {
    this.localStorageService.removeItem(this.localStorageService.TOKEN_KEY);
    this.currentUserLoginOn.next(false);
    //

    this.isUserLogged.next(false);

    this.localStorageService.removeItem(this.localStorageService.TOKEN_KEY)
    // localStorage.removeItem("token");
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

  signup(userSignUp: UserSignUp) {
    return this.http.post<any>(`${this.backendURL}/auth/signup`, userSignUp)
  }

  get _token() {
    return this.token
  }

  // get user(): Observable<String> {
  //   return this.currentToken.asObservable();
  // }

  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

  get userToken(): String {
    return this.currentToken.value;
  }
}
