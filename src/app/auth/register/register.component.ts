import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    name: ['Leonardo', [ Validators.required, Validators.minLength(3) ] ],
    lastname: ['Bravo', [ Validators.required, Validators.minLength(3) ] ],
    email: [ 'leo@gmail.com', [ Validators.required, Validators.email ] ],
    password: [ '123456', Validators.required ],
    password2: [ '1234567', Validators.required ],
    terms: [ false, Validators.required ]
  },{
    validators: this.samePasswords('password', 'password2')
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  createUser() {
    this.formSubmitted = true;
    console.log( this.registerForm.value );

    if ( this.registerForm.invalid ) {
      return;
    }

    this.userService.createUser( this.registerForm.value ).subscribe( data => {
      
      this.router.navigateByUrl('/');
      
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error')
    })
  }

  noValid( space: string ): boolean {
    if( this.registerForm.get(space)?.invalid && this.formSubmitted ) {
      return true
    } else {
      return false
    }
  }

  passwordsInvalid() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if ( pass1 !== pass2 && this.formSubmitted ) {
      return true
    } else {
      return false
    }
  }

  acceptTerms() {
    return !this.registerForm.get('terms')?.value && this.formSubmitted;
  }

  samePasswords( pass1Name: string, pass2Name: string ) {

    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if( pass1Control?.value === pass2Control?.value ) {
        pass2Control?.setErrors(null)
      } else {
        pass2Control?.setErrors({ notSame: true })
      }

    }

  }

}
