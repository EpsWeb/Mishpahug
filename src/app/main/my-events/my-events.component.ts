import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {EventsService} from '../shared/services/events.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';

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
  selector: 'max-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.sass']
})
export class MyEventsComponent implements OnInit, OnDestroy {

  constructor(private eventsService: EventsService) {
  }

  eventsInProgress: MyEvent[];
  eventsPending: MyEvent[];
  eventsDone: MyEvent[];

  s1: Subscription;
  isLoaded = false;

  ngOnInit() {
    this.s1 = this.eventsService.getMyEvents()
      .subscribe((res) => {
        console.log(res);
        this.eventsInProgress = res['events'].filter((event) => event['status'].toLowerCase() === 'in progress');
        this.eventsPending = res['events'].filter((event) => event['status'].toLowerCase() === 'pending');
        this.eventsDone = res['events'].filter((event) => event['status'].toLowerCase() === 'done');
        this.isLoaded = true;
        console.log(this.eventsInProgress, this.eventsPending, this.eventsDone);
      }, (err) => {
        console.log(err);
      });
  }

  becomeToStatusPending() {
    this.ngOnInit();
  }

  ngOnDestroy() {
    if (this.s1) {
      this.s1.unsubscribe();
    }
  }

}
