




import { Injectable } from '@angular/core';

interface IModal {
  id: string;
  visible: boolean;
}

@Injectable({
  providedIn: 'root'
})
// @Injectable()
export class ModalService {
  private modals: IModal[] = []
  // private visible = false 

  constructor() { }

  register(id: string) {
    this.modals.push({
      id,
      visible: false
    })
    // console.log(this.modals)
  }

  unregister(id: string) {
    this.modals = this.modals.filter(
      element => element.id !== id
    )
  }

  isModalOpen(id: string): boolean {
    return !!this.modals.find(element => element.id === id)?.visible
    // Boolean(this.modals.find(element => element.id === id)?.visible)
    // Boolean() works the same as "!!" we covert non boolean return to a boolean !!
  }

  toggleModal(id: string) {
    const modal = this.modals.find(element => element.id === id)

    if (modal) {
      modal.visible  = !modal.visible
    }
    // this.visible = !this.visible
  }



}
