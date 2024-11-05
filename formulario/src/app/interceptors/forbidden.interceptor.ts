import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../services/auth/auth.service";

@Injectable()
export class ForbiddenInterceptor implements HttpInterceptor {

  constructor(private snackbar: MatSnackBar, private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 401) {
          this.authService.logout();
        }
        if (error.status === 403) {
          console.error('Accesso vietato! Non hai i permessi per compiere questa azione.');
          this.snackbar.open('Accesso vietato! Non hai i permessi per compiere questa azione.', 'Chiudi', {
            duration: 5000, horizontalPosition: 'center', verticalPosition: 'top'
          })
        } else if (error.status >= 300 && error.status <= 500) {
          console.error(error.error&&error.message?error.message:'');
          this.snackbar.open("Error! " + error.message&&error.message?error.message:'', 'Chiudi', {
            duration: 5000, horizontalPosition: 'center', verticalPosition: 'top'
          })
        }
        return throwError(() => new Error ());
      })
    );
  }
}
