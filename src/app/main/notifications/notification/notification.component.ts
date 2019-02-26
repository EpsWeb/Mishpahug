import {Component, Input} from '@angular/core';
import {NotificationsService} from '../../shared/services/notifications.service';

@Component({
  selector: 'max-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.sass']
})
export class NotificationComponent {
  @Input('notification') notification: any;

  constructor(private notificationsService: NotificationsService) {
  }

  openPanel() {
    console.log(this.notification);
    // this.notification.read = true;
    this.notificationsService.readNotification(+this.notification['notificationId'])
      .subscribe((res) => {
        this.notification.read = true;
      }, (err) => {
        console.log(err);
      });
  }

}
