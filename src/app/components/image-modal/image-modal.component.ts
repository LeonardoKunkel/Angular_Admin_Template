import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styles: [
  ]
})
export class ImageModalComponent implements OnInit {

  public hideModal: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  closeModal() {
    this.hideModal = false;
  }

}
