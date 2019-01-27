import {Component, Input, OnInit} from '@angular/core';
import {MishEvent} from '../../shared/models/event.model';

@Component({
  selector: 'max-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.sass']
})
export class EventCardComponent implements OnInit {

  @Input('ev') event: MishEvent;

  constructor() {
  }

  formRating = 3;

  ngOnInit() {
  }

}
