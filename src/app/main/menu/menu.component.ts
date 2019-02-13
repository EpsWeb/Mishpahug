import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'max-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {
  @Output('closeMenu') closeMenu = new EventEmitter<any>();

  constructor(private authService: AuthService, private router: Router) {
  }

  message = '';

  ngOnInit() {
    if (!this.authService.getProfileData()['firstName']) {
      setTimeout(() => {
        this.message = 'User has empty profile!';
      }, 300);
      setTimeout(() => {
        this.message = '';
      }, 3000);
    }
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['main/welcome']);
    this.closeMenu.emit();
  }

  goToEvents() {
    this.router.navigate(['main/events']);
    this.closeMenu.emit();
  }

  goToProfile() {
    this.router.navigate(['main/fill-profile']);
    this.closeMenu.emit();
  }

  goToCalendar() {
    this.router.navigate(['main/calendar']);
    this.closeMenu.emit();
  }

}
