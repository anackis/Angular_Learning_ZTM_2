import { Component, Input, ElementRef, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  // providers: [ModalService]
})
export class ModalComponent implements OnInit {
  @Input() modalID = ''

  constructor (public modal: ModalService, public el: ElementRef) {
    // console.log(this.modal.visible)
    // console.log(el)
  }

  ngOnInit(): void {
    document.body.appendChild(this.el.nativeElement)
  }

  closeModal($event: Event) {
    this.modal.toggleModal(this.modalID)
  }

}
