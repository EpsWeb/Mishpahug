import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';
import {NotificationsService} from '../shared/services/notifications.service';

@Component({
  selector: 'max-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {
  @Output('closeMenu') closeMenu = new EventEmitter<any>();

  constructor(private authService: AuthService, private router: Router, private notificationsService: NotificationsService) {
  }

  message = '';
  countOfUnreadNotifications;

  isLoaded = false;

  ngOnInit() {
    this.notificationsService.getCountOfUnreadNotifications()
      .subscribe((res) => {
        this.countOfUnreadNotifications = res['notificationsCount'];
        this.isLoaded = true;
      }, (err) => {
        setTimeout(() => {
          this.message = 'User has empty profile!';
        }, 300);
        setTimeout(() => {
          this.message = '';
        }, 3000);
      });

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

  goToNotice() {
    this.router.navigate(['main/notifications']);
    this.closeMenu.emit();
  }

}
















