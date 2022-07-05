import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';

@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  styles: [
  ]
})
export class MedicComponent implements OnInit {

  public medicForm!: FormGroup;
  public hospitals: Hospital[] = [];

  constructor(
    private fb: FormBuilder,
    private hospServ: HospitalService
  ) { }

  ngOnInit(): void {

    this.loadHospitals()

    this.medicForm = this.fb.group({
      name: ['Leonardo', Validators.required],
      lastname: ['Bravo', Validators.required],
      hospital: ['', Validators.required]
    })

  }

  loadHospitals() {

    this.hospServ.loadHospital().subscribe( (hospitals: Hospital[]) => {
      console.log(hospitals);
      this.hospitals = hospitals;
    })

  }

  saveMedic() {
    console.log(this.medicForm.value);
  }

}
