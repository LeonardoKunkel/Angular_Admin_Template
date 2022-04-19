import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  public profileForm!: FormGroup;
  public user!: User;

  constructor( private fb: FormBuilder, private userService: UserService ) {

    this.user = userService.user;

  }

  ngOnInit() {

    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]]
    });

  }

  updateProfile() {

    console.log(this.profileForm.value);
    this.userService.updateUser( this.profileForm.value )
        .subscribe( data => {
          const { name, email } = this.profileForm.value;
          this.user.name = name;
          this.user.email = email;
        })

  }

}
