import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

const url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor( private http: HttpClient ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  private transformUsers( results: any[] ): User[] {

    return results.map(
      usr => new User(usr.name, usr.email, '', usr.img, usr.google, usr.role, usr.uid)
    )

  }

  search( type: 'users' | 'hospitals' | 'medics', term: string ) {
    const url2 = `${ url }/all/collection/${ type }/${ term }`;

    return this.http.get<any[]>( url2, this.headers)
          .pipe(
            map( (data: any) => {

              switch ( type ) {
                case 'users':
                  return this.transformUsers(data.results)
              
                default:
                  return [];
              }

            })
          );
  }

}