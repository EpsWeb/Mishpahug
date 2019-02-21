import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {BaseApi} from '../core/base-api';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ImageService extends BaseApi {

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  constructor(public http: HttpClient) {
    super(http);
  }

  postImage(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      // 'security-token': 'mytoken'
      'X-Requested-With': 'XMLHttpRequest'
    });
    return this.http.post('https://api.cloudinary.com/v1_1/danielepel/image/upload', formData, {headers: headers})
      .pipe(
        catchError(this.handleError)
      );
  }
}
