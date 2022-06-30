import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { Hospital } from 'src/app/models/hospital.model';

import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchService } from 'src/app/services/search.service';
import { HospitalService } from '../../../services/hospital.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit {

  public hospitals: Hospital[] = [];
  public loading: boolean = true;
  private imgSubs!: Subscription;

  public hospsTemp: Hospital[] = [];

  constructor(
    private hospitalServ: HospitalService,
    private modalImgServ: ModalImageService,
    private searchServ: SearchService  
  ) { }

  ngOnInit(): void {

    this.loadHospitals();

    this.imgSubs = this.modalImgServ.newImage.subscribe( img => this.loadHospitals())
    
  }

  loadHospitals() {

    this.loading = true;

    this.hospitalServ.loadHospital().subscribe( hosp => {
      this.loading = false;
      this.hospitals = hosp;
    })

  }

  saveChanges( hospital: Hospital ) {

    this.hospitalServ.updateHospital( hospital._id, hospital.name )
        .subscribe( resp => {
          Swal.fire('Updated!', hospital.name, 'success' );
        })

  }

  deleteHospital( hospital: Hospital ) {

    this.hospitalServ.deleteHospital( hospital._id )
        .subscribe( resp => {
          this.loadHospitals();
          Swal.fire('Deleted!', hospital.name, 'success' );
        })

  }

  async openAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Add Hospital',
      text: 'Add the name of a new hospital.',
      input: 'text',
      inputPlaceholder: 'Name of the Hospital',
      showCancelButton: true
    })
    
    if( value!.trim().length > 0 ) {
      this.hospitalServ.createHospital( value ).subscribe( (resp: any) => {
        console.log(resp);
        this.hospitals.push( resp.newHospital )
      })
    }
  }

  openModal( hospital: Hospital ) {

    this.modalImgServ.openModal( 'hospitals', hospital._id, hospital.img );

  }

  search( term: string ) {
    if ( term.length === 0 ) {
      return this.loadHospitals();
    }

    this.searchServ.search( 'hospitals', term ).subscribe( results => {

      this.hospitals = results as Hospital[];

    });

    return;

  }

}
