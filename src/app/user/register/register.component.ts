import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth'; 
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
  ) {}

  inSubmission = false

  registerForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    age: new FormControl('', [
      Validators.required,
      Validators.min(18),
      Validators.max(120),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    ]),
    confirm_password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(13),
      Validators.maxLength(13),
    ]),
  })

  showAlert = false
  alertMsg = 'Please wait! Your accont is being created.'
  alertColor = 'blue'

  async register() {
    this.showAlert = true
    this.alertMsg = 'Please wait! Your accont is being created.'
    this.alertColor = 'blue'
    this.inSubmission = true

    const { email, password } = this.registerForm.value

    try {
      const userCred = await this.auth.createUserWithEmailAndPassword(
        email as string, password as string
      )

      
    }catch(e) {
      console.log(e)
      // this.showAlert = true
      this.alertMsg = 'An unexpected error occured. Please try again later.'
      this.alertColor = 'red'
      this.inSubmission = false
      return
    }
    
    this.alertMsg = 'Succes! Your account has been created.'
    this.alertColor = 'green'
    
  }
}
