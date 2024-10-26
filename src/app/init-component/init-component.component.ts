import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-init-component',
  templateUrl: './init-component.component.html',
  styleUrls: ['./init-component.component.scss']
})
export class InitComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private modalService: ModalService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((isAuth) => {
      this.isAuthenticated = isAuth;
    });
  }

  login() {
    this.modalService.toggleModal('auth');
  }

  goToHome() {
    this.router.navigateByUrl('/home');
  }
}
