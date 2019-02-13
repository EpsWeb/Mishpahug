import {Component, ElementRef, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MishEvent} from '../../shared/models/event.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {EventsService} from '../../shared/services/events.service';
import {Message} from '../../shared/models/message.model';

@Component({
  selector: 'max-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.sass']
})
export class EventCardComponent {

  @Input('event') event: MishEvent;

  constructor(public dialog: MatDialog) {
  }

  openDetail() {
    const dialogDetailRef = this.dialog.open(DialogDetailComponent, {
      data: {event: this.event}
    });

    dialogDetailRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
      }
    });
  }

}

@Component({
  selector: 'max-dialog-detail',
  templateUrl: 'dialog-detail.component.html',
  styleUrls: ['dialog-detail.component.sass']
})
export class DialogDetailComponent implements OnInit {
  @ViewChild('wrapper') wrapper: ElementRef;

  constructor(
    public dialogDetailRef: MatDialogRef<DialogDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MishEvent,
    private eventsService: EventsService) {
  }

  message: Message;

  ngOnInit() {
    this.message = new Message('', 'danger');
    this.wrapper.nativeElement.parentElement.parentElement.style.border = '6px solid #5F4F8D';
    this.wrapper.nativeElement.parentElement.parentElement.style.padding = '0';
  }

  showMessage(text, typeMessage) {
    this.message = new Message(text, typeMessage);
    setTimeout(() => {
      this.message = new Message('', typeMessage);
    }, 3000);
  }

  onNoClick(): void {
    this.dialogDetailRef.close();
  }

  joinEvent(ev) {
    console.log(ev);
    if (ev) {
      this.eventsService.subscriveToEvent(ev['eventId'])
        .subscribe((resp) => {
            this.showMessage('You succesfully joined to event', 'success');
            setTimeout(() => {
              this.dialogDetailRef.close();
            }, 3000);
            console.log('success');
          },
          (res) => {
            if (res.status === 401 || res.status === 404) {
              this.showMessage('For joining to event you should authorize', 'danger');
            }

            if (res.status === 409) {
              this.showMessage('You are the owner of the event or already subscribed to it!', 'danger');
            }
            console.log('error', res);
          });
    }
  }

}

























