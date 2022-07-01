import { Component, OnInit } from '@angular/core';
import { Medic } from 'src/app/models/medic.model';
import { MedicService } from 'src/app/services/medic.service';
import { ModalImageService } from 'src/app/services/modal-image.service';

@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
  styles: [
  ]
})
export class MedicsComponent implements OnInit {

  public medics: Medic[] = [];
  public loading: boolean = true;

  constructor(
    private medicsServ: MedicService,
    private modalImgServ: ModalImageService
  ) { }

  ngOnInit(): void {
    this.loadMedics();
  }

  loadMedics() {

    this.loading = true;

    this.medicsServ.loadMedics().subscribe( meds => {
      this.loading = false;
      this.medics = meds;
    });
  }

  openModal( medic: Medic ) {

    this.modalImgServ.openModal( 'medics', medic._id, medic.img );

  }

}
