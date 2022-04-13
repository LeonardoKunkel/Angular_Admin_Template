import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from 'src/environments/environment';

const url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient ) { }

  createUser( formData: RegisterForm ) {
    return this.http.post(`${ url }/users/create`, formData);
  }

}
