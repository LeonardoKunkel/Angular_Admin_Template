import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { Medic } from 'src/app/models/medic.model';

import { MedicService } from 'src/app/services/medic.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
  styles: [
  ]
})
export class MedicsComponent implements OnInit, OnDestroy {

  public medics: Medic[] = [];
  public loading: boolean = true;
  private imgSubs!: Subscription;

  constructor(
    private medicsServ: MedicService,
    private modalImgServ: ModalImageService,
    private searchServ: SearchService
  ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.loadMedics();
    this.imgSubs = this.modalImgServ.newImage.subscribe( img => this.loadMedics())
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

  search( term: string ) {

    if ( term.length === 0 ) {
      return this.loadMedics();
    }

    this.searchServ.search( 'medics', term ).subscribe( results => {

      this.medics = results as Medic[];

    });

    return;

  }

  deleteMedic( medic: Medic ) {

    Swal.fire({
      title: 'Delete Medic?',
      text: `You are about to delete ${ medic.name } ${ medic.lastname }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.medicsServ.deleteMedic(medic._id).subscribe(data => {

          this.loadMedics()

          Swal.fire(
            'Medic removed',
            `${ medic.name } ${ medic.lastname } removed correctly`,
            'success'
          )
        });
      }
    })

  }

}
