import {BaseApi} from '../core/base-api';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {MishEvent} from '../models/event.model';

@Injectable()
export class EventsService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getAllEvents(): Observable<MishEvent[]> {
    return this.get('events');
  }

}
