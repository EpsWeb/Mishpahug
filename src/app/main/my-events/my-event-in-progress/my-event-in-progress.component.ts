import {Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {EventsService} from '../../shared/services/events.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

export interface MyEvent {
  eventId: number;
  title: string;
  holiday: string;
  confession: string;
  date: string;
  time: string;
  duration: number;
  food: string[];
  description: string;
  status: string;
  participants: any[];
}

@Component({
  selector: 'max-my-event-in-progress',
  templateUrl: './my-event-in-progress.component.html',
  styleUrls: ['./my-event-in-progress.component.sass']
})
export class MyEventInProgressComponent {
  @Input() eventInProgress: MyEvent;
  @Output() becomeToStatusPending = new EventEmitter<any>();

  constructor(private eventsService: EventsService, private dialog: MatDialog, private snackBar: MatSnackBar, private router: Router) {
  }

  activeProfile: any;
  subscribersAreShown = false;
  photoIsShown = true;
  buttonShowSubscribersText = 'Show subscribers';

  showPhoto(event, subscriber) {
    console.log(event.target);
    this.activeProfile = subscriber;
    console.log(this.activeProfile);
    this.photoIsShown = true;
  }

  toggleShowingSubscribers() {
    this.buttonShowSubscribersText = this.subscribersAreShown ? 'Show subscribers' : 'Hide subscribers';
    this.subscribersAreShown = !this.subscribersAreShown;
  }

  cancelShowingPhoto() {
    this.photoIsShown = false;
  }

  inviteToEvent(eventId: number, userId: number) {
    this.eventsService.inviteToEvent(eventId, userId)
      .subscribe((res) => {
        const div = document.getElementById('' + userId);
        div.classList.add('active');
        this.snackBar.open('You have invited user', 'Success', {
          duration: 3500
        });
        console.log(res);
      }, (err) => {
        console.log(err);
        if (err.status === 401 || err.status === 404) {
          this.snackBar.open('You should authorize', 'Denied', {
            duration: 3500
          });
          this.router.navigate(['/main/welcome']);
        }

        if (err.status === 409) {
          this.snackBar.open('User is already invited to the event or is not subscribed to the event!', 'Declined', {
            duration: 3500
          });
        }
      });
  }

  finishInvite() {
    this.eventsService.changeStatusToPending(this.eventInProgress['eventId'])
      .subscribe((res) => {
        this.becomeToStatusPending.emit();
        this.snackBar.open('This event is in pending page now', 'Success', {
          duration: 3500
        });
      }, (err) => {
        console.log(err);
        if (err.status === 401 || err.status === 404) {
          this.snackBar.open('You should authorize', 'Denied', {
            duration: 3500
          });
          this.router.navigate(['/main/welcome']);
        }

        if (err.status === 409) {
          this.snackBar.open('You are not associated with the event!', 'Declined', {
            duration: 3500
          });
        }
      });
  }

  openConfirmationInvitationDialog(activeProfile) {
    const dialogInvitationConfirmationRef = this.dialog.open(InvitationConfirmationDialogComponent, {
      data: {
        activeProfile: activeProfile
      }
    });

    dialogInvitationConfirmationRef.afterClosed()
      .subscribe((res) => {
        console.log(res);
        if (res) {
          this.inviteToEvent(this.eventInProgress['eventId'], res['userId']);
        }
      });
  }
}

@Component({
  selector: 'max-invitation-confirmation',
  templateUrl: './invitation-confirmation.component.html',
  styleUrls: ['./invitation-confirmation.component.sass']
})

export class InvitationConfirmationDialogComponent implements OnInit {
  @ViewChild('wrapper') wrapper: ElementRef;

  constructor(
    public dialogInvitationConfirmationRef: MatDialogRef<InvitationConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.wrapper.nativeElement.parentElement.parentElement.style.border = '6px solid #5F4F8D';
    this.wrapper.nativeElement.parentElement.parentElement.style.padding = '0';
  }

  onNoClick(): void {
    this.dialogInvitationConfirmationRef.close();
  }

}
