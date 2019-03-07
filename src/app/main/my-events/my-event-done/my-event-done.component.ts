import {Component, Input} from '@angular/core';

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
  selector: 'max-my-event-done',
  templateUrl: './my-event-done.component.html',
  styleUrls: ['./my-event-done.component.sass']
})
export class MyEventDoneComponent {
  @Input() eventDone: MyEvent;

}
