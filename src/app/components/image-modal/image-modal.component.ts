import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImageService } from 'src/app/services/modal-image.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styles: [
  ]
})
export class ImageModalComponent implements OnInit {

  public imageUp!: File;
  public imgTemp: any = null;

  constructor( public modalService: ModalImageService, public fileUpService: FileUploadService ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.imgTemp = null;
    this.modalService.closeModal()
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

    const id = this.modalService.id;
    const type = this.modalService.type;

    this.fileUpService.updatePhoto( this.imageUp, type, id )
        .then( img => {
          Swal.fire('Saved', 'Image updated!', 'success');

          this.modalService.newImage.emit(img);

          this.closeModal();
        }).catch( err => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');
        });

  }

}
