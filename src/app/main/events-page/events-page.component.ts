import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MishEvent} from '../shared/models/event.model';
import {EventsService} from '../shared/services/events.service';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Message} from '../shared/models/message.model';

@Component({
  selector: 'max-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.sass']
})
export class EventsPageComponent implements OnInit, OnDestroy {
  // TODO delete pipes except of city-pipe, uncomment uploadEvents() in ngOnInit
  constructor(private eventsService: EventsService, public dialog: MatDialog, private router: Router, private http: HttpClient) {
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

  lat;
  long;
  showMessage = false;

  uploadEvents() {
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


  getUserIP = function (onNewIP) {
    const myPeerConnection = RTCPeerConnection || webkitRTCPeerConnection;
    const pc = new myPeerConnection({
        iceServers: []
      }),
      localIPs = {},
      ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g;

    // key;

    function iterateIP(ip) {
      if (!localIPs[ip]) {
        onNewIP(ip);
      }
      localIPs[ip] = true;
    }

    pc.createDataChannel('');

    pc.createOffer().then(function (sdp) {
      sdp.sdp.split('\n').forEach(function (line) {
        if (line.indexOf('candidate') < 0) {
          return;
        }
        line.match(ipRegex).forEach(iterateIP);
      });

      pc.setLocalDescription(sdp);
    }).catch(function (reason) {
      // An error occurred, so handle the failure to connect
    });

    pc.onicecandidate = function (ice) {
      if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) {
        return;
      }
      ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
    };
  };

  ngOnInit() {
    // this.uploadEvents();
    this.getUserIP(() => {
      this.http.get('http://api.ipapi.com/api/check?access_key=3f11cd082defe9e03f19b4ffc348076f')
        .subscribe((res) => {
          console.log(res);
          this.lat = res['latitude'];
          this.long = res['longitude'];
          console.log(this.lat, this.long);
        });
    });

    this.s1 = this.eventsService.getAllEvents()
      .subscribe((events: MishEvent[]) => {
        this.events = events;
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);

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

      // const data = {
      //   'location': {
      //     'lat': this.lat,
      //     'lng': this.long,
      //     'radius': this.selectedRadius
      //   },
      //   'filters': {
      //     'dateFrom': this.selectedDateFromFormatForPipe,
      //     'dateTo': this.selectedDateToFormatForPipe,
      //     'holidays': this.selectedHoliday,
      //     'confession': this.selectedConfession,
      //     'food': this.selectedFood
      //   }
      // };

      this.uploadEvents();

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
  holidays = ['Shabat', 'Purim', 'Pesach', 'Rosh Hashana', 'Sukkot'];
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



