import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
// @Injectable()
export class ModalService {
  private visible = false 

  constructor() { }

  isModalVisible() {
    return this.visible
  }

  toggleModal() {
    this.visible = !this.visible
  }
}
