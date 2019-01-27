import {Component, OnDestroy, OnInit} from '@angular/core';
import {MishEvent} from '../shared/models/event.model';
import {EventsService} from '../shared/services/events.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'max-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.sass']
})
export class EventsPageComponent implements OnInit, OnDestroy {

  constructor(private eventsService: EventsService) {
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
      .subscribe((events: MishEvent) => {
        this.events = events;
      });
  }

  ngOnDestroy() {
    if (this.s1) {
      this.s1.unsubscribe();
    }
  }


}





