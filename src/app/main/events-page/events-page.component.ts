import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MishEvent} from '../shared/models/event.model';
import {EventsService} from '../shared/services/events.service';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {Router} from '@angular/router';

@Component({
  selector: 'max-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.sass']
})
export class EventsPageComponent implements OnInit, OnDestroy {
  // TODO delete pipes except of city-pipe
  constructor(private eventsService: EventsService, public dialog: MatDialog, private router: Router) {
  }

  dateFrom: string;
  dateTo: string;
  holiday: string;
  confession: string;
  food: string;

  cities = ['None', 'Afula', 'Akko', 'Arad', 'Ashdod', 'Ashqelon', 'Bat-Yam', 'Beersheba', 'Bet-Sheʾan', 'Bet-Sheʿarim',
    'Bnei-Brak', 'Caesarea', 'Dimona', 'Dor', 'Elat', 'En-Gedi', 'Givʿatayim', 'Hadera', 'Haifa',
    'Herzliya', 'Holon', 'Jerusalem', 'Karmiʾel', 'Kefar Sava', 'Lod', 'Meron', 'Nahariyya',
    'Nazareth', 'Netanya', 'Petah-Tiqwa', 'Qiryat-Shemona', 'Ramat-Gan', 'Ramla', 'Rehovot',
    'Rishon-LeZiyyon', 'Sedom', 'Tel-Aviv–Yafo', 'Tiberias', 'Zefat'];

  events: MishEvent[];
  s1: Subscription;
  selectedCity = '';
  selectedFood = '';
  selectedHoliday = '';
  selectedConfession = '';

  countEvents = 100;
  selectedPage = '0';
  selectedRadius = 2000;

  selectedDateFromFormatForDB = '';
  selectedDateFromFormatForPipe = '';
  selectedDateToFormatForDB = '';
  selectedDateToFormatForPipe = '';

  lat = 32.4;
  long = 35.3;
  showMessage = false;
  geolocationPosition;
  isLoaded = false;

  uploadEvents(pageIndex) {
    const data = {
      'location': {
        'lat': this.lat,
        'lng': this.long,
        'radius': this.selectedRadius
      },
      'filters': {
        'dateFrom': this.selectedDateFromFormatForPipe,
        'dateTo': this.selectedDateToFormatForPipe,
        'holidays': this.selectedHoliday,
        'confession': this.selectedConfession,
        'food': this.selectedFood
      }
    };

    console.log(this.selectedPage);
    // console.log(e);
    this.selectedPage = pageIndex;

    this.eventsService.getAllEventsProgressList(data, this.selectedPage)
      .subscribe((res) => {
          this.events = res['content'];
          this.countEvents = res['totalElements'];
        },
        () => {
          this.showMessage = true;
          setTimeout(() => {
            this.showMessage = false;
          }, 3000);
        });
  }

  ngOnInit() {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.geolocationPosition = position;
          console.log(this.geolocationPosition);
          this.lat = position['coords']['latitude'];
          this.long = position['coords']['longitude'];
          this.uploadEvents(0);
          this.isLoaded = true;
        },
        error => {
          console.log(error.code);
        }
      );
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      console.log(this.long, this.lat);
      console.log(result);

      this.selectedFood = '';
      this.selectedHoliday = '';
      this.selectedConfession = '';
      this.selectedDateFromFormatForPipe = '';
      this.selectedDateToFormatForPipe = '';

      if (result) {

        if (result['dateFrom']) {
          this.selectedDateFromFormatForDB = moment(result['dateFrom']).format('DD.MM.YYYY');
          this.selectedDateFromFormatForPipe = moment(this.selectedDateFromFormatForDB, 'DD.MM.YYYY').format('YYYY-MM-DD');
        }

        if (result['dateTo']) {
          this.selectedDateToFormatForDB = moment(result['dateTo']).format('DD.MM.YYYY');
          this.selectedDateToFormatForPipe = moment(this.selectedDateToFormatForDB, 'DD.MM.YYYY').format('YYYY-MM-DD');
        }

        this.selectedHoliday = result['holiday'];
        this.selectedConfession = result['confession'];
        this.selectedFood = result['food'];
        this.selectedRadius = result['radius'];
      }

      this.uploadEvents(0);

    });
  }

  goToAddEvent() {
    this.router.navigate(['/main/add-event']);
  }

  ngOnDestroy() {
    if (this.s1) {
      this.s1.unsubscribe();
    }
  }
}

@Component({
  selector: 'max-dialog',
  templateUrl: 'max-dialog.component.html',
  styleUrls: ['max-dialog.component.sass']
})
export class DialogComponent implements OnInit {
  @ViewChild('dialog') dialog: ElementRef;

  constructor(public dialogRef: MatDialogRef<DialogComponent>) {
  }

  confessions = ['irreligious', 'religious'];
  holidays = ['Shabat', 'Purim', 'Pesah', 'Rosh Hashana', 'Sukkot'];
  foods = ['Kosher', 'Vegetarian', 'Any'];

  form: FormGroup;

  ngOnInit() {
    this.dialog.nativeElement.parentElement.parentElement.style.border = '6px solid #5F4F8D';
    this.form = new FormGroup({
      dateFrom: new FormControl(''),
      dateTo: new FormControl(''),
      holiday: new FormControl(''),
      confession: new FormControl(''),
      food: new FormControl(''),
      radius: new FormControl(2000, [Validators.required])
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}



