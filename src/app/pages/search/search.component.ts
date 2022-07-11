import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { Medic } from 'src/app/models/medic.model';
import { User } from 'src/app/models/user.model';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  public users: User[] = [];
  public medics: Medic[] = [];
  public hospitals: Hospital[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchServ: SearchService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params
        .subscribe( ({term}) => this.globalSearch( term ) )

  }

  globalSearch( term2: string ) {

    this.searchServ.globalSearch( term2 ).subscribe( (data: any) => {

      this.users = data.users
      this.medics = data.medics
      this.hospitals = data.hospitals

    })

  }

  openMedic( medic: Medic ) {

    console.log(medic);

  }

}
