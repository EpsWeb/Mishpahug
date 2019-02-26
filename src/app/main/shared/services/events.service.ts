import {BaseApi} from '../core/base-api';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {MishEvent} from '../models/event.model';
import {catchError} from 'rxjs/operators';

@Injectable()
export class EventsService extends BaseApi {

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  constructor(public http: HttpClient) {
    super(http);
  }

  getAllEventsProgressList(data, page: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.post('event/allprogresslist?page=' + page + '&size=12', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  createNewEvent(data: any): Observable<any> {
    // const notCodedToken = JSON.parse(localStorage.getItem('user')).email + ':' + JSON.parse(localStorage.getItem('user')).password;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': <string>localStorage.getItem('token')
      })
    };
    // return this.post('data', data)
    return this.post('event/creation', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  subscriveToEvent(eventId: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': <string>localStorage.getItem('token')
      })
    };
    return this.put(`event/subscription/${eventId}`, {}, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getEventsForCalendar(month: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': <string>localStorage.getItem('token')
      })
    };
    return this.get(`event/calendar/${month}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getMyEventInfo(eventId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': <string>localStorage.getItem('token')
      })
    };
    return this.get(`event/own/${eventId}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getParticipationList(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': <string>localStorage.getItem('token')
      })
    };
    return this.get('event/participationlist', httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  unsubscribeFromEvent(eventId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': <string>localStorage.getItem('token')
      })
    };
    return this.put(`event/unsubscription/${eventId}`, {}, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  voteForEvent(eventId: number, voteCount: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': <string>localStorage.getItem('token')
      })
    };
    return this.put(`event/vote/${eventId}/${voteCount}`, {}, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

}




















