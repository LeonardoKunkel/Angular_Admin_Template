import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(3) ] ],
    email: [ '', [ Validators.required, Validators.email ] ],
    password: [ '', Validators.required ],
    password2: [ '', Validators.required ],
    terms: [ false, Validators.required ]
  });

  constructor( private fb: FormBuilder ) { }

  createUser() {
    this.formSubmitted = true;
    console.log( this.registerForm.value );

    if ( this.registerForm.valid ) {
      console.log('Posting form');
    } else {
      console.log('Form invalid');
      
    }
  }

  noValid( space: string ): boolean {
    if( this.registerForm.get(space)?.invalid && this.formSubmitted ) {
      return true
    } else {
      return false
    }
  }

  acceptTerms() {
    return !this.registerForm.get('terms')?.value && this.formSubmitted;
  }

}
