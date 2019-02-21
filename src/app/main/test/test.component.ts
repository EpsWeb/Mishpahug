import {Component, OnInit} from '@angular/core';
import {throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'max-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.sass']
})

export class TestComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  ngOnInit() {

    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Basic am9obkRvZUBnbWFpbC5jb206MTIzNDU2Nzg5'
    //   })
    // };
    //
    // this.http.get('https://starlark-mishpahug.herokuapp.com/user/profile', httpOptions)
    //   .pipe(
    //     catchError(this.handleError)
    //   )
    //   .subscribe((res) => {
    //     console.log(res);
    //   }, (err) => {
    //     console.log(err);
    //   });

  }

}





















