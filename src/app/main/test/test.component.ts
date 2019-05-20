import {Component, OnInit} from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'max-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.sass']
})

export class TestComponent implements OnInit {

  constructor() {
  }

  mom = moment().locale('he');

  ngOnInit() {
    console.log(this.mom.format());
  }

}





















