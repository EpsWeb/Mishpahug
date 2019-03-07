import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {EventsService} from '../shared/services/events.service';
import {combineLatest, Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';

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

  constructor(private eventsService: EventsService, private router: Router) {
  }

  eventsInProgress: MyEvent[];
  eventsPending: MyEvent[];
  eventsDone: MyEvent[];

  s1: Subscription;
  isLoaded = false;

  ngOnInit() {

    this.s1 = combineLatest([
      this.eventsService.getMyEvents(),
      this.eventsService.getMyEventsHistory()
    ]).subscribe((data: [any[], any[]]) => {
      this.eventsInProgress = data[0]['events'].filter((event) => event['status'].toLowerCase() === 'in progress');
      this.eventsPending = data[0]['events'].filter((event) => event['status'].toLowerCase() === 'pending');
      this.eventsDone = data[1]['events'];
      this.isLoaded = true;
      console.log(this.eventsInProgress, this.eventsPending, this.eventsDone);
    }, (err) => {
      console.log(err);
      this.router.navigate(['/main/welcome']);
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
