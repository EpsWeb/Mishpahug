import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Subscription, throwError} from 'rxjs';
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

  ngOnInit() {

    this.s1 = this.notificationsService.getNotifications()
      .subscribe((res) => {
        console.log(res);
        this.notifications = res['notifications'];
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
