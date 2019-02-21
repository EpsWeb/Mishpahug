import {Injectable} from '@angular/core';
import {BaseApi} from '../core/base-api';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable()
export class NotificationsService extends BaseApi {

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  constructor(public http: HttpClient) {
    super(http);
  }

  getCountOfUnreadNotifications(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': <string>localStorage.getItem('token')
      })
    };
    return this.get('notification/count', httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getNotifications(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': <string>localStorage.getItem('token')
      })
    };
    return this.get('notification/list', httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  readNotification(notificationId: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': <string>localStorage.getItem('token')
      })
    };
    return this.put(`notification/isRead/${notificationId}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

}
