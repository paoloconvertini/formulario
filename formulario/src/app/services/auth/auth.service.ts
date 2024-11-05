import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {MatSnackBar} from "@angular/material/snack-bar";
import {environment} from "../../../environments/environment";
import {User} from "../../models/user";
import {LoginResponseI} from "../../models/login-response.interface";
import {Router} from "@angular/router";

const url = environment.baseAuthUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private http: HttpClient, private snackbar: MatSnackBar, private helper: JwtHelperService, private router: Router) {
    const token = localStorage.getItem(environment.TOKEN_KEY);
    this._isLoggedIn$.next(!!token);
  }

  updatePassword(username: string, data: any) : Observable<any> {
    return this.http.put<any>(url + `users/${username}`, data);
  }

  login(user: User): Observable<LoginResponseI> {
    return this.http.post<LoginResponseI>(url + environment.LOGIN, user).pipe(
      tap((res: LoginResponseI) => {
        if(!res.idToken) {
          console.log("ERRORE");
        }
        if (user.username) {
          localStorage.setItem(environment.USERNAME, user.username);
        }
        this._isLoggedIn$.next(true);
        localStorage.setItem(environment.TOKEN_KEY, res.idToken);
        let tokenObj = this.helper.decodeToken(res.idToken);
        user.ruolo = tokenObj.groups;
        if (user.ruolo!.includes('Admin')) {
          localStorage.setItem(environment.ADMIN, 'Y');
        }
      }),
      tap(() => this.snackbar.open('Login successfull', 'Chiudi', {
        duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'
      }))
    )
  }

  logout() {
    this._isLoggedIn$.next(false);
    localStorage.removeItem(environment.TOKEN_KEY);
    localStorage.removeItem(environment.ADMIN);
    localStorage.removeItem(environment.USERNAME);
    this.router.navigate(['']);
  }
}
