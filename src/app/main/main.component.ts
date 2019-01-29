import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from './shared/services/auth.service';

@Component({
  selector: 'max-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {
  }

  isLoginVisible = false;
  isRegistrationVisible = false;
  isMenuVisible = false;
  isAuth;

  ngOnInit() {
    // Navigate to welcome page if user is not authed
    // this.router.navigate(['welcome'], {relativeTo: this.route});
    this.isAuth = this.authService.isAuthenticate();
  }

  auth() {
    this.isAuth = this.authService.isAuthenticate();
  }

  changeLoginVisibility(dir) {
    this.isLoginVisible = dir;
  }

  openLogin() {
    this.changeLoginVisibility(true);
  }

  closeLogin() {
    this.changeLoginVisibility(false);
  }

  changeRegistrationVisibility(dir) {
    this.isRegistrationVisible = dir;
  }

  openRegistration() {
    this.changeRegistrationVisibility(true);
  }

  closeRegistration() {
    this.changeRegistrationVisibility(false);
  }

  registrationFromLogin() {
    this.closeLogin();
    this.openRegistration();
  }

  loginFromRegistration() {
    this.closeRegistration();
    this.openLogin();
  }

  toogleMenuVisible() {
    this.isMenuVisible = !this.isMenuVisible;
  }

}













