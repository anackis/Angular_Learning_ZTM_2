import { Component } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
})
export class NavComponent {
  currentLanguage: string = 'en';

  constructor(
    public modal: ModalService,
    public auth: AuthService,
  ) {}

  openModal($event: Event) {
    $event.preventDefault()

    this.modal.toggleModal('auth')
  }

  toggleLanguage() {
    this.currentLanguage = this.currentLanguage === 'en' ? 'lv' : 'en';
  }

}
