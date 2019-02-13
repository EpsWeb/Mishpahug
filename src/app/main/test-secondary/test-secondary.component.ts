import {Component, OnInit} from '@angular/core';
import {addDays, addHours, addMinutes, endOfMonth, startOfDay, subDays} from 'date-fns';
import {CalendarEvent} from 'angular-calendar';
import {EventsService} from '../shared/services/events.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

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
  selector: 'max-test-secondary',
  templateUrl: './test-secondary.component.html',
  styleUrls: ['./test-secondary.component.sass']
})
export class TestSecondaryComponent implements OnInit {

  constructor(private eventsService: EventsService, private http: HttpClient) {
  }

  date = '2018-03-30';
  time = '18:32:00';
  duration = 180;

  allEvents = [];
  myEvents = [];
  subscribedEvents = [];

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
    },
    {
      start: startOfDay(new Date()),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'An event with no end date',
      color: colors.yellow,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: new Date(),
      title: 'A draggable and resizable event',
      color: colors.yellow,
    }
  ];

  ngOnInit() {
    this.eventsService.getEventsForCalendarTest()
      .subscribe((res) => {
        console.log(res);
        res['myEvents'].map((e) => {
          const start = new Date(e.date + ' ' + e.time);
          const end = addMinutes(new Date(e.date + ' ' + e.time), this.duration);
          const color = colors.yellow;
          const ev: CalendarEvent = {
            start: start,
            end: end,
            title: e.title,
            color: color
          };
          this.myEvents.push(ev);
          this.allEvents.push(ev);
        });
        res['subscribedEvents'].map((e) => {
          const start = new Date(e.date + ' ' + e.time);
          const end = addMinutes(new Date(e.date + ' ' + e.time), this.duration);
          const color = colors.blue;
          const ev: CalendarEvent = {
            start: start,
            end: end,
            title: e.title,
            color: color
          };
          this.subscribedEvents.push(ev);
          this.allEvents.push(ev);
        });
      });
    // this.allEvents = this.myEvents.concat(this.subscribedEvents);
    console.log('myEvents', this.myEvents);
    console.log('subscribedEvents', this.subscribedEvents);
    console.log('allEvents', this.allEvents);
    console.log(new Date(this.date + ' ' + this.time));
    console.log(addMinutes(new Date(this.date + ' ' + this.time), this.duration));

    // Request to real server (down)
    // this.http.get('https://starlark-mishpahug.herokuapp.com/event/calendar/1', {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': 'd2ZtQG1haWwucnU6MTIzNDU2Nzg='
    //   })
    // })
    //   .subscribe((res) => {
    //       console.log('success', res);
    //     },
    //     (res) => {
    //       console.log('error', res);
    //     });
  }

}






















































