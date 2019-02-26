import {Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {EventsService} from '../shared/services/events.service';
import {Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'max-participation-list',
  templateUrl: './participation-list.component.html',
  styleUrls: ['./participation-list.component.sass']
})
export class ParticipationListComponent implements OnInit, OnDestroy {

  eventsInProgress = [];
  eventsPending = [];
  eventsDone = [];


  s1: Subscription;
  isMapVisible = false;
  latMap: number;
  lngMap: number;
  originMap: any;
  isLoaded = false;

  constructor(private eventsService: EventsService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.s1 = this.eventsService.getParticipationList()
      .subscribe((data) => {
          console.log(data['events']);
          data['events'].forEach((e) => {
            console.log(e['status']);
            if (e['status'].toLowerCase() === 'in progress') {
              this.eventsInProgress.push(e);
            }
            if (e['status'].toLowerCase() === 'pending') {
              this.eventsPending.push(e);
            }
            if (e['status'].toLowerCase() === 'done') {
              this.eventsDone.push(e);
            }
          });
          this.isLoaded = true;
        },
        (err) => {
          console.log(err);
        }
      );
    // console.log(this.eventsInProgress);
  }

  getDuration(durationInMinutes: number) {
    let res = '';
    const durationHours = durationInMinutes < 60 ? '' : durationInMinutes < 1440 ? (durationInMinutes / 60).toFixed(0) : 'more than 1 day';
    if (durationInMinutes < 60) {
      res += 'minutes';
    } else if (durationInMinutes < 1440) {
      res += '' + durationHours + 'h ';
    } else if (durationInMinutes < 2880) {
      res += '1d ' + ((durationInMinutes - 1440) / 60) + 'h';
    } else {
      res += 'more 2 days';
    }
    return res;
  }

  unsubscribe(id: number) {
    this.eventsService.unsubscribeFromEvent(id)
      .subscribe((data) => {
        console.log(data);
        this.eventsInProgress = this.eventsInProgress.filter(e => e['eventId'] !== id);
      }, (err) => {
        console.log(err);
      });
  }

  openUnsubscribeDialog(eventInProgress: any) {
    const dialogDetailRef = this.dialog.open(UnsubscribeConfirmDialogComponent, {
      data: {
        eventInProgress: eventInProgress
      }
    });
    dialogDetailRef.afterClosed()
      .subscribe((res) => {
        console.log(res);
        if (res) {
          this.unsubscribe(res['eventId']);
        }
      });
  }

  openMap(lat: number, lng: number) {
    this.latMap = lat;
    this.lngMap = lng;
    this.originMap = {
      lat: lat,
      lng: lng
    };
    this.isMapVisible = true;
  }

  voteForEvent(eventId: number, voteCount: number) {
    this.eventsService.voteForEvent(eventId, voteCount)
      .subscribe((res) => {
        console.log(res);
      }, (err) => {
        console.log(err);
      });
  }

  openVoteDialog(eventDone: any) {
    const dialogDetailRef = this.dialog.open(VoteDialogComponent, {
      data: {
        eventDone: eventDone
      }
    });
    dialogDetailRef.afterClosed()
      .subscribe((res) => {
        console.log(res);
        if (res) {
          this.voteForEvent(eventDone['eventId'], res);
        }
      });
  }

  ngOnDestroy() {
    if (this.s1) {
      this.s1.unsubscribe();
    }
  }

}

@Component({
  selector: 'max-unsubscribe-confirm',
  templateUrl: './unsubscribe-confirm.component.html',
  styleUrls: ['./unsubscribe-confirm.component.sass']
})

export class UnsubscribeConfirmDialogComponent implements OnInit {
  @ViewChild('wrapper') wrapper: ElementRef;

  constructor(
    public dialogDetailRef: MatDialogRef<UnsubscribeConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.wrapper.nativeElement.parentElement.parentElement.style.border = '6px solid #5F4F8D';
    this.wrapper.nativeElement.parentElement.parentElement.style.padding = '0';
  }

  onNoClick(): void {
    this.dialogDetailRef.close();
  }

}

@Component({
  selector: 'max-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.sass']
})

export class VoteDialogComponent implements OnInit {
  @ViewChild('wrapper') wrapper: ElementRef;

  voteCount = 5;

  constructor(
    public dialogDetailRef: MatDialogRef<VoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.wrapper.nativeElement.parentElement.parentElement.style.border = '6px solid #5F4F8D';
    this.wrapper.nativeElement.parentElement.parentElement.style.padding = '0';
  }

  onNoClick(): void {
    this.dialogDetailRef.close();
  }

}


































