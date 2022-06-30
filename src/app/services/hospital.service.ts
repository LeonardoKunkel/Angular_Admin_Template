import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Hospital, HospitalInterface } from '../models/hospital.model';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

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

  loadHospital() {

    const url = `${ base_url }/hospital`;

    return this.http.get<HospitalInterface>( url, this.headers)
                .pipe(
                  map( (resp: HospitalInterface) => resp.allHospitals )
                )

  }

  createHospital( name?: string ) {

    const url = `${ base_url }/hospital/create`;

    return this.http.post( url, { name }, this.headers);

  }

  updateHospital( name?: string, _id?: string ) {

    const url = `${ base_url }/hospital/${ _id }`;

    return this.http.put( url, { name }, this.headers);

  }

  deleteHospital( _id?: string ) {

    const url = `${ base_url }/hospital/${ _id }`;

    return this.http.delete( url, this.headers);

  }

}
