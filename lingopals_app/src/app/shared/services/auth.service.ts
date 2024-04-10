import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isUserLogged = new BehaviorSubject<boolean>(false);

  constructor() { }

  login() {
    // TODO: Lógica para iniciar sesión
    this.isUserLogged.next(true);
  }

  logout() {
    // TODO: Lógica para cerrar sesión
    this.isUserLogged.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isUserLogged.asObservable();
  }

}
