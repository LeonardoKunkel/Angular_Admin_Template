import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SearchService } from 'src/app/services/search.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {

  public total: number = 0;
  public users: User[] = [];
  public usersTemp: User[] = [];
  public from: number = 0;
  public loading: boolean = true;

  constructor( private userService: UserService, private searchService: SearchService ) { }

  ngOnInit(): void {

    this.loadUsers();

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

}
