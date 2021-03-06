import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Medic, MedicInterface, MedicByIdInterface } from '../models/medic.model';
import { map } from 'rxjs/operators';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class MedicService {

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

  loadMedics() {

    const url = `${ base_url }/medic`;

    return this.http.get<MedicInterface>( url, this.headers)
                .pipe(
                  map( (resp: MedicInterface) => resp.allMedics )
                )

  }

  getMedicById( id: string ) {

    const url = `${ base_url }/medic/${ id }`;

    return this.http.get<MedicByIdInterface>( url, this.headers)
                .pipe(
                  map( (resp: MedicByIdInterface ) => resp.medic )
                )

  }

  createMedic( medic: { name: string, hospital: string } ) {

    const url = `${ base_url }/medic/create`;

    return this.http.post( url, medic, this.headers);

  }

  updateMedic( medic: Medic ) {

    const url = `${ base_url }/medic/${ medic._id }`;

    return this.http.put( url, medic, this.headers);

  }

  deleteMedic( _id?: string ) {

    const url = `${ base_url }/medic/${ _id }`;

    return this.http.delete( url, this.headers);

  }

}
