import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private userServ: UserService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      // return ( this.userServ.role === 'ADMIN_ROLE' ) ? true : false;

     if ( this.userServ.role === 'ADMIN_ROLE' ) {
       return true
     } else {
      this.router.navigateByUrl('/dashboard')
       return false
     }

  }
  
}
