import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {addMinutes, isSameDay, isSameMonth} from 'date-fns';
import {Subject, Subscription} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import {EventsService} from '../shared/services/events.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'max-calendar',
  templateUrl: './calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent implements OnInit, OnDestroy {

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();

  // events: CalendarEvent[] = [
  //   {
  //     start: subDays(startOfDay(new Date()), 1),
  //     end: addDays(new Date(), 1),
  //     title: 'A 3 day event',
  //     color: colors.red,
  //     actions: this.actions,
  //     allDay: true,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true
  //     },
  //     draggable: true
  //   },
  //   {
  //     start: startOfDay(new Date()),
  //     title: 'An event with no end date',
  //     color: colors.yellow,
  //     actions: this.actions
  //   },
  //   {
  //     start: subDays(endOfMonth(new Date()), 3),
  //     end: addDays(endOfMonth(new Date()), 3),
  //     title: 'A long event that spans 2 months',
  //     color: colors.blue,
  //     allDay: true
  //   },
  //   {
  //     start: addHours(startOfDay(new Date()), 2),
  //     end: new Date(),
  //     title: 'A draggable and resizable event',
  //     color: colors.yellow,
  //     actions: this.actions,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true
  //     },
  //     draggable: true
  //   }
  // ];
  events: CalendarEvent[] = [];
  countOfMyEvents: number;
  countOfSubscribedEvents: number;

  activeDayIsOpen = true;

  s1: Subscription;

  constructor(private modal: NgbModal, private eventsService: EventsService) {
    console.log(this.events);
  }

  ngOnInit() {
    this.s1 = this.eventsService.getEventsForCalendarTest()
      .subscribe((res) => {
        console.log(res);
        res['myEvents'].map((e) => {
          const start = new Date(e.date + ' ' + e.time);
          const end = addMinutes(new Date(e.date + ' ' + e.time), e.duration);
          const color = colors.yellow;
          const ev: CalendarEvent = {
            start: start,
            end: end,
            title: e.title,
            color: color
          };
          this.events.push(ev);
        });
        res['subscribedEvents'].map((e) => {
          const start = new Date(e.date + ' ' + e.time);
          const end = addMinutes(new Date(e.date + ' ' + e.time), e.duration);
          const color = colors.blue;
          const ev: CalendarEvent = {
            start: start,
            end: end,
            title: e.title,
            color: color
          };
          this.events.push(ev);
        });
        console.log(res['myEvents'].length);
        this.countOfMyEvents = res['myEvents'].length;
        this.countOfSubscribedEvents = res['subscribedEvents'].length;
      });
    console.log(this.events);
    console.log(this.modalContent);
  }

  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd
                    }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = {event, action};
    this.modal.open(this.modalContent, {size: 'lg'});
  }

  ngOnDestroy() {
    if (this.s1) {
      this.s1.unsubscribe();
    }
  }

}
