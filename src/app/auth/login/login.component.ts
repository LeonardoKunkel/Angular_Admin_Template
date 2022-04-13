import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent {

  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: [ 'leo@gmail.com', [ Validators.required, Validators.email ] ],
    password: [ '123456', Validators.required ],
    remember: [ false ]
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  login() {

    this.userService.login( this.loginForm.value ).subscribe( data => {
      console.log(data);
      this.router.navigateByUrl('/')
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error')
    });
    
  }

}
