import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'max-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logOut() {
    this.authService.logout();
  }

  goToEvents() {
    this.router.navigate(['main/events']);
  }

  goToProfile() {
    this.router.navigate(['main/fill-profile']);
  }

}
