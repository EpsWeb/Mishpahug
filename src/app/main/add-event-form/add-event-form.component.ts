/// <reference types='@types/googlemaps' />

import {Component, ElementRef, Inject, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {MapsAPILoader} from '@agm/core';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {EventsService} from '../shared/services/events.service';
import {MAT_SNACK_BAR_DATA, MatSnackBar} from '@angular/material';

@Component({
  selector: 'max-add-event-form',
  templateUrl: './add-event-form.component.html',
  styleUrls: ['./add-event-form.component.sass']
})

export class AddEventFormComponent implements OnInit {
  @ViewChild('address') public address: ElementRef;

  form: FormGroup;
  minDate = new Date();

  confessions = ['irreligious', 'religious'];
  holidays = ['Shabat', 'Purim', 'Pesach', 'Rosh Hashana', 'Sukkot'];
  foods = ['Kosher', 'Vegetarian', 'Any'];

  lat;
  lng;
  placeID;
  city;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private router: Router, private eventsService: EventsService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.mapsAPILoader.load().then(
      () => {
        const autocomplete = new google.maps.places.Autocomplete(this.address.nativeElement, {types: ['address']});
        autocomplete.addListener('place_changed', () => {
          this.ngZone.run(() => {
            const place: google.maps.places.PlaceResult = autocomplete.getPlace();
            // console.log(place);
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
            this.lat = place.geometry.location.lat();
            this.lng = place.geometry.location.lng();
            this.placeID = place.place_id;
            this.city = place.address_components[1].long_name;
          });
        });
      }
    );
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      holiday: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      dateFrom: new FormControl('', [Validators.required]),
      timeFrom: new FormControl('', [Validators.required]),
      dateTo: new FormControl('', [Validators.required]),
      timeTo: new FormControl('', [Validators.required]),
      confession: new FormControl('', [Validators.required]),
      food: new FormControl('', [Validators.required]),
      about: new FormControl('', [Validators.required])
    });
  }

  onSubmit(form: NgForm) {
    const {title, holiday, timeFrom, timeTo, confession, food, about} = form.value;
    let {dateFrom, dateTo} = form.value;
    dateFrom = moment(dateFrom).format('YYYY-MM-DD');
    dateTo = moment(dateTo).format('YYYY-MM-DD');

    const momentFrom = moment(dateFrom + ' ' + timeFrom);

    const fromYears = moment(momentFrom).format('YYYY');
    const fromMonths = moment(momentFrom).format('MM');
    const fromDays = moment(momentFrom).format('DD');
    const fromMinutes = moment(momentFrom).format('mm');
    const fromHours = moment(momentFrom).format('HH');

    const momentFromNew = moment([fromYears, fromMonths, fromDays, fromHours, fromMinutes]);

    const momentTo = moment(dateTo + ' ' + timeTo);

    const toYears = moment(momentTo).format('YYYY');
    const toMonths = moment(momentTo).format('MM');
    const toDays = moment(momentTo).format('DD');
    const toMinutes = moment(momentTo).format('mm');
    const toHours = moment(momentTo).format('HH');

    const momentToNew = moment([toYears, toMonths, toDays, toHours, toMinutes]);

    const duration = momentToNew.diff(momentFromNew, 'hours');

    const data = {
      'title': title,
      'holiday': holiday,
      'address': {
        'city': this.city,
        'place_id': this.placeID,
        'location': {
          'lat': this.lat,
          'lng': this.lng
        }
      },
      'confession': confession,
      'date': dateFrom,
      'time': timeFrom + ':00',
      'duration': duration,
      'food': food,
      'description': about
    };

    console.log(data);

    // TODO add request, initialize snackbar
    this.eventsService.createNewEvent(data)
      .subscribe((res) => {
          console.log(res);
          this.snackBar.openFromComponent(AddEventSnackComponent, {
            data: 'You created event',
            duration: 3000,
          });
          this.router.navigate(['/main/events']);
        },
        (res) => {

          if (res.status === 401 || res.status === 404) {
            this.snackBar.openFromComponent(AddEventSnackComponent, {
              data: 'For adding event you should authorize',
              duration: 3000,
            });
            this.router.navigate(['/main/events']);
          }

          if (res.status === 409) {
            this.snackBar.openFromComponent(AddEventSnackComponent, {
              data: 'You has already created the event on this date and time!',
              duration: 3000,
            });
            this.router.navigate(['/main/events']);
          }

          if (res.status === 422) {
            this.snackBar.openFromComponent(AddEventSnackComponent, {
              data: 'Data is not correct!',
              duration: 3000,
            });
          }

          console.log(res);
        });
  }
}

@Component({
  selector: 'max-snack',
  templateUrl: 'max-snack.html'
})
export class AddEventSnackComponent implements OnInit {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
  }

  ngOnInit() {
    console.log(this.data);
  }

}
