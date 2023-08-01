

import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import IClip from 'src/app/models/clip.modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClipService } from 'src/app/services/clip.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {
  @Input() activeClip: IClip | null = null
  inSubmission = false
  showAlert = false
  alertColor = 'blue'
  alertMessage = 'Please wait! Updating clip.'

  clipID = new FormControl('', {
    nonNullable: true
  })
  title = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(3),
    ],
    nonNullable: true
  })
  editForm = new FormGroup({
    title: this.title,
    id: this.clipID
  })


  constructor(
    private modal: ModalService,
    private clipService: ClipService
  ) {

  }

  ngOnInit(): void {
    this.modal.register('editClip')
  }

  ngOnDestroy() {
    this.modal.unregister('editClip')
  }

  ngOnChanges() {
    if (!this.activeClip) {
      return;
    }

    this.clipID.setValue(this.activeClip.docID as string)
    this.title.setValue(this.activeClip.title)
  }

  async submit() {
    this.inSubmission = true
    this.showAlert = true
    this.alertColor = 'blue'
    this.alertMessage = 'Please wait! Updating clip.'

    try {
      await this.clipService.updateClip(
        this.clipID.value, this.title.value
      )
    }
    catch(e) {
      this.inSubmission = false
      this.alertColor = 'red'
      this.alertMessage = 'Something went wrong. Try again later'
      return
    }
    
    this.inSubmission = false
    this.alertColor = 'green'
    this.alertMessage = 'Success!'
  }

  
}