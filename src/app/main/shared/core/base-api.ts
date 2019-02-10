import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class BaseApi {
  constructor(public http: HttpClient) {
  }

  baseApi = 'http://localhost:3000/';

  get(text: string, headers: any = ''): Observable<any> {
    return this.http.get(this.baseApi + text, headers);
  }

  post(text: string, obj: any, headers: any = ''): Observable<any> {
    return this.http.post(this.baseApi + text, obj, headers);
  }

  put(text: string, obj: any, headers: any = ''): Observable<any> {
    return this.http.put(this.baseApi + text, obj, headers);
  }
}
