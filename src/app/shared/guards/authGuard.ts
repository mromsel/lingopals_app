import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    isLogged: boolean = false

    constructor(private authService: AuthService, private router: Router) {
        authService.isLoggedIn().subscribe(isLogged => this.isLogged = isLogged)
    }

    canActivate(): boolean {
        let isLogged = false;
        this.authService.isLoggedIn().subscribe(loggedIn => {
            isLogged = loggedIn;
            if (!isLogged) {
                // this.router.navigate(['/login']);
                this.router.navigate(['/intro']);
            }
        });
        return isLogged;
    }
    // canActivate(): Observable<boolean> {
    //     return this.authService.isLoggedIn().pipe(
    //         tap((isUserLogged: boolean) => {
    //             if (!isUserLogged) {
    //                 this.router.navigate(['/login']);
    //             }
    //         })
    //     );
    // }
}