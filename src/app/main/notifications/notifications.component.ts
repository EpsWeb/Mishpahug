import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {NotificationsService} from '../shared/services/notifications.service';

@Component({
  selector: 'max-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.sass']
})
export class NotificationsComponent implements OnInit, OnDestroy {

  constructor(private http: HttpClient, private notificationsService: NotificationsService) {
  }

  notifications;

  s1: Subscription;
  isLoaded = false;

  ngOnInit() {

    this.s1 = this.notificationsService.getNotifications()
      .subscribe((res) => {
        console.log(res);
        this.notifications = res['notifications'];
        this.isLoaded = true;
      }, (err) => {
        console.log(err);
      });
  }

  ngOnDestroy() {
    if (this.s1) {
      this.s1.unsubscribe();
    }
  }

}
