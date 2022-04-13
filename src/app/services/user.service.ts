import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login.interface';
import { Observable, of } from 'rxjs';

const url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient ) { }

  tokenValid(): Observable<boolean> {

    const token = localStorage.getItem('token') || '';

    return this.http.get(`${ url }/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (data: any) => {
        localStorage.setItem('token', data.token)
      }),
      map( data => true),
      catchError( error => of(false) )
    )

  }

  createUser( formData: RegisterForm ) {
    return this.http.post(`${ url }/users/create`, formData)
                .pipe(
                  tap( (data: any) => {
                    console.log(data);
                    localStorage.setItem('token', data.token)
                  })
                )
  }

  login( formData: LoginForm ) {
    return this.http.post(`${ url }/login`, formData)
                .pipe(
                  tap( (data: any) => {
                    console.log(data);
                    localStorage.setItem('token', data.token)
                  })
                )
  }

}
