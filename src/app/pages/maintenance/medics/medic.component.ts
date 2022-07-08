import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';

import { HospitalService } from '../../../services/hospital.service';
import { MedicService } from '../../../services/medic.service';

import { Hospital } from '../../../models/hospital.model';
import { Medic } from 'src/app/models/medic.model';

@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  styles: [
  ]
})
export class MedicComponent implements OnInit {

  public medicForm!: FormGroup;
  public hospitals: Hospital[] = [];
  public hospitalSelected?: Hospital;
  public medicSelected?: Medic;

  constructor(
    private fb: FormBuilder,
    private hospServ: HospitalService,
    private medServ: MedicService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( ({id}) => this.loadMedic( id ) )
    
    this.medicForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      hospital: ['', Validators.required]
    })

    this.loadHospitals();
    this.medicForm.get('hospital')?.valueChanges
                  .subscribe( HospitalId => {
                    
                    this.hospitalSelected = this.hospitals.find( h => h._id === HospitalId );

                  })

  }

  loadMedic( id: string ) {

    if( id === 'new' ) {
      return;
    }

    this.medServ.getMedicById( id )
    .pipe(
      delay(100)
    )
    .subscribe( (med: any) => {

      const { name, lastname, hospital:{ _id } } = med;
      
      this.medicSelected  = med;
      this.medicForm.setValue({ name, lastname, hospital: _id });

    }, error => {
      return this.router.navigateByUrl(`/dashboard/medics`);
    })

  }

  loadHospitals() {

    this.hospServ.loadHospital().subscribe( (hospitals: Hospital[]) => {

      this.hospitals = hospitals;

    })

  }

  saveMedic() {

    const { name } = this.medicForm.value;

    if( this.medicSelected ) {

      const data = {
        ...this.medicForm.value,
        _id: this.medicSelected._id
      }
      this.medServ.updateMedic( data ).subscribe( resp => {
        console.log(resp);
        
        Swal.fire('Updated', `${ name } succesfully updated`, 'success');
      })

    } else {

      this.medServ.createMedic( this.medicForm.value )
                  .subscribe( (resp: any) => {
                    console.log(resp);
                    Swal.fire('Created', `${ name } succesfully created`, 'success');
                    this.router.navigateByUrl(`/dashboard/medic/${ resp.newMedic._id }`)
                  });

    }

  }

}
