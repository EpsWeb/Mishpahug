import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {MainModule} from './main/main.module';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UserService} from './main/shared/services/user.service';
import {AuthService} from './main/shared/services/auth.service';
import {AuthGuard} from './main/shared/services/auth.guard';
import {EventsService} from './main/shared/services/events.service';
import {AgmCoreModule} from '@agm/core';
import {NotificationsService} from './main/shared/services/notifications.service';
import {ImageService} from './main/shared/services/image.service';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule, FirestoreSettingsToken} from '@angular/fire/firestore';
import {EmployeeService} from './main/shared/services/employee.service';
import {ToastrModule} from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MainModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ positionClass: 'inline' }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [UserService, AuthService, AuthGuard, EventsService, NotificationsService, ImageService, EmployeeService, {
    provide: FirestoreSettingsToken,
    useValue: {}
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}










































