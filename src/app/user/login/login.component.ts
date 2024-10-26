

import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  credentials = {
    email: 'test@inbox.lv',
    password: 'testtest1'
  }
  showAlert = false
  alertMsg = 'Please wait! We are logging you in.'
  alertColor = 'blue'
  inSubmission = false

  constructor(
    private auth:AngularFireAuth,
    private router: Router,
  ) {}

  async login() {
    this.showAlert = true
    this.alertMsg = 'Please wait! We are logging you in.'
    this.alertColor = 'blue'
    this.inSubmission = true

    try {
      await this.auth.signInWithEmailAndPassword(
        this.credentials.email, this.credentials.password
      )
    } catch(e) {
      this.inSubmission = false
      this.alertMsg = 'An unexpected error occurred. Please try again later.'
      this.alertColor = 'red'

      console.log(e)

      return
    }

    this.alertMsg = 'Success! You are now logged in.'
    this.alertColor = 'green'
    this.router.navigate(['/home']);
  }

}
