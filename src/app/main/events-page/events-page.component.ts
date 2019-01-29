import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MishEvent} from '../shared/models/event.model';
import {EventsService} from '../shared/services/events.service';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, NgForm} from '@angular/forms';

@Component({
  selector: 'max-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.sass']
})
export class EventsPageComponent implements OnInit, OnDestroy {

  constructor(private eventsService: EventsService, public dialog: MatDialog) {
  }

  cities = ['None', 'Afula', 'Akko', 'Arad', 'Ashdod', 'Ashqelon', 'Bat Yam', 'Beersheba', 'Bet Sheʾan', 'Bet Sheʿarim',
    'Bnei Brak', 'Caesarea', 'Dimona', 'Dor', 'Elat', 'En Gedi', 'Givʿatayim', 'Hadera', 'Haifa',
    'Herzliya', 'Holon', 'Jerusalem', 'Karmiʾel', 'Kefar Sava', 'Lod', 'Meron', 'Nahariyya',
    'Nazareth', 'Netanya', 'Petah Tiqwa', 'Qiryat Shemona', 'Ramat Gan', 'Ramla', 'Rehovot',
    'Rishon LeZiyyon', 'Sedom', 'Tel Aviv–Yafo', 'Tiberias', 'Zefat'];

  events: MishEvent[];
  s1: Subscription;

  ngOnInit() {
    this.s1 = this.eventsService.getAllEvents()
      .subscribe((events: MishEvent[]) => {
        this.events = events;
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {});
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

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
  }

  confessions = ['Irreligious', 'Religious'];
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
      food: new FormControl('')
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(form: NgForm) {
    console.log(form);
  }

}



