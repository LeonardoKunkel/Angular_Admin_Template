import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { User } from 'src/app/models/user.model';

import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchService } from 'src/app/services/search.service';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit, OnDestroy {

  public total: number = 0;
  public users: User[] = [];
  public usersTemp: User[] = [];

  public imgSubs!: Subscription;

  public from: number = 0;
  public loading: boolean = true;

  constructor(
    private userService: UserService,
    private searchService: SearchService,
    private modalService: ModalImageService
  ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {

    this.loadUsers();

    this.imgSubs = this.modalService.newImage.subscribe( img => this.loadUsers())

  }

  loadUsers() {

    this.loading = true;

    this.userService.loadUser( this.from )
      .subscribe( ({ totalUsers, users }) => {
        this.total = totalUsers;
        this.users = users;
        this.usersTemp = users;
        this.loading = false;
      });

  }

  changePage( value: number ) {
    this.from += value;

    if ( this.from < 0 ) {
      this.from = 0;
    } else if ( this.from >= this.total ) {
      this.from -= value;
    }

    this.loadUsers();

  }

  search( term: string ) {

    if (term.length === 0) {
      return this.users = this.usersTemp;
    }

    this.searchService.search( 'users', term ).subscribe(results => {

      this.users = results;

    })

    return;

  }

  deleteUser(user: User) {

    if ( user.uid === this.userService.uid ) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se puede borrar a si mismo'
      })
    }

    Swal.fire({
      title: '¿Borrar usuario?',
      text: `Está a punto de borrar a ${ user.name }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.userService.deleteUser(user).subscribe(data => {

          this.loadUsers()

          Swal.fire(
            'Usuario Borrado',
            `${ user.name } fue eliminado correctamente`,
            'success'
          )
        });
      }
    })

    return;

  }

  changeRole( user: User ) {
    this.userService.saveUser( user ).subscribe( resp => {
      console.log(resp);
    });
  }

  openModal( user: User ) {

    this.modalService.openModal('users', user.uid, user.img);

  }
}
