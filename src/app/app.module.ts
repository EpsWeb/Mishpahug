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
// import * as  Cloudinary from 'cloudinary-core';
// import {CloudinaryModule, CloudinaryConfiguration} from '@cloudinary/angular';
// import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';
import {ImageService} from './main/shared/services/image.service';

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
    // CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'danielepel'}),
    // CloudinaryModule.forRoot({Cloudinary}, { cloud_name: 'danielepel' } as CloudinaryConfiguration),
    // CloudinaryModule.forRoot({Cloudinary}, { cloud_name: 'danielepel' } as CloudinaryConfiguration),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDIht5XWZ1k6-lVAbV9y7mGPKxyL6lkIeI',
      libraries: ['places']
    })
  ],
  providers: [UserService, AuthService, AuthGuard, EventsService, NotificationsService, ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
