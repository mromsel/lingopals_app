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
        this.authService.currentUserLoginOn.subscribe(currentUserLoginOn => {
            console.log(currentUserLoginOn);

            this.isLogged = currentUserLoginOn;
            if (!this.isLogged) {
                // this.router.navigate(['/login']);
                this.router.navigate(['/intro']);
            }
        })
        // authService.isLoggedIn().subscribe(isLogged => this.isLogged = isLogged)
    }

    canActivate(): boolean {
        // let isLogged = false;
        let logged = localStorage.getItem("token") != null
        if (!logged) {
            // this.router.navigate(['/login']);
            this.router.navigate(['/intro']);
        }
        // this.authService.currentUserLoginOn.subscribe(currentUserLoginOn => {
        //     isLogged = currentUserLoginOn;

        // })
        // this.authService.isLoggedIn().subscribe(loggedIn => {
        //     isLogged = loggedIn;
        //     if (!isLogged) {
        //         // this.router.navigate(['/login']);
        //         this.router.navigate(['/intro']);
        //     }
        // });
        console.log(this.isLogged);

        return logged;
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