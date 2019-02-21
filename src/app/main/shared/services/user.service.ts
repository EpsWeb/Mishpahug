import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {User} from '../models/user.model';
import {catchError, map} from 'rxjs/operators';
import {BaseApi} from '../core/base-api';

@Injectable()
export class UserService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  login(email: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(email + ':' + password)
      })
    };
    return this.post('user/login', {}, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateUserProfile(data: User): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': <string>localStorage.getItem('token')
      })
    };
    return this.post('user/profile', data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  registrateNewUser(email: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(email + ':' + password)
      })
    };
    return this.post('user/registration', {}, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getProfileData(token: string): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.get('user/profile', httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

}
