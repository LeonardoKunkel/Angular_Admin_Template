import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login.interface';
import { User } from '../models/user.model';

const url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user!: User;

  constructor( private http: HttpClient, private router: Router ) { }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {

    return this.user.uid || '';

  }

  tokenValid(): Observable<boolean> {

    return this.http.get(`${ url }/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (data: any) => {
        console.log(data);
        const {
          email,
          google,
          name,
          role,
          img,
          uid
        } = data.user;

        this.user = new User( name, email, '', img, google, role, uid );
        
        localStorage.setItem('token', data.token);
        return true
      }),
      catchError( error => of(false) )
    )

  }

  updateUser( data: {email: string, name: string, role: string} ) {

    data = {
      ...data,
      role: this.user.role!
    };

    return this.http.put(`${ url }/users/${ this.uid }`, data, {
      headers: {
      'x-token': this.token
      }
    });

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
