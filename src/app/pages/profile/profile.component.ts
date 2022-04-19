import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  public profileForm!: FormGroup;
  public user!: User;
  public imageUp!: File;
  public imgTemp: any = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private fileUpService: FileUploadService
  ) {

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

          Swal.fire('Saved', 'Changes saved', 'success');
        }, (err) => {
          console.log(err.error.msg);
          Swal.fire('Error', err.error.msg, 'error')
        })

  }

  changeImage(evt: any): any {

    const file: File = evt.target.files[0];
    this.imageUp = file;

    if(!file) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result?.toString();
    }
    
  }

  uploadImage() {

    this.fileUpService.updatePhoto( this.imageUp, 'users', this.user.uid! )
        .then( img => {
          this.user.img = img;
          Swal.fire('Saved', 'Image updated!', 'success');
        }).catch( err => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');
        });

  }

}
