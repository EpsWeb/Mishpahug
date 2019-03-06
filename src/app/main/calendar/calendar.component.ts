import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {addMinutes, isSameDay, isSameMonth} from 'date-fns';
import {Subject, Subscription, throwError} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import {EventsService} from '../shared/services/events.service';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {AdditionalDataForCalendarEvent} from '../shared/models/additionalDataForCalendarEvent.model';

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
  // changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent implements OnInit, OnDestroy {

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent<AdditionalDataForCalendarEvent>;
  };

  isLoaded = false;

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];
  countOfMyEvents = 0;
  countOfSubscribedEvents = 0;
  currentMonth = new Date().getMonth() + 1;
  currentYear = new Date().getFullYear();

  activeDayIsOpen = false;

  s1: Subscription;

  constructor(private modal: NgbModal, private eventsService: EventsService) {
    console.log(this.events);
  }

  fixData(month: number, year: number) {
    if (this.s1) {
      this.s1.unsubscribe();
    }
    this.s1 = this.eventsService.getEventsForCalendar(month, year)
      .subscribe((res) => {
        console.log(res);
        this.events = [];
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
        this.isLoaded = true;
      });
  }

  ngOnInit() {
    this.fixData(this.currentMonth, this.currentYear);
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

  handleEvent(action: string, event: CalendarEvent<AdditionalDataForCalendarEvent>): void {
    this.modalData = {event, action};
    // this.eventsService.getMyEventInfo(ev)
    // this.modalData.meta = new AdditionalDataForCalendarEvent()
    console.log(this.modalData.event);
    this.modal.open(this.modalContent, {size: 'lg'});
  }

  previousMonth() {
    this.activeDayIsOpen = false;
    const year = this.currentMonth === 1 ? --this.currentYear : this.currentYear;
    this.currentMonth--;
    const month = this.currentMonth === 0 ? 12 : this.currentMonth % 12;
    this.fixData(month, year);
  }

  nextMonth() {
    this.activeDayIsOpen = false;
    const year = this.currentMonth === 12 ? ++this.currentYear : this.currentYear;
    this.currentMonth++;
    const month = this.currentMonth === 12 ? 12 : this.currentMonth % 12;
    this.fixData(month, year);
  }

  ngOnDestroy() {
    if (this.s1) {
      this.s1.unsubscribe();
    }
  }

}
