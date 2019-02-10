/// <reference types='@types/googlemaps' />

import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {AgmCoreModule, MapsAPILoader} from '@agm/core';
import {ancestorWhere} from 'tslint';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {logger} from 'codelyzer/util/logger';

@Component({
  selector: 'max-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.sass']
})
export class TestComponent implements OnInit {
  constructor(private http: HttpClient) {
  }



  ngOnInit() {

  }
}





















