import {NgModule} from '@angular/core';
import {MainComponent} from './main.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MainRoutingModule} from './main-routing.module';
import {LoginComponent} from './shared/components/login/login.component';
import {RegistrationComponent} from './shared/components/registration/registration.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {MenuComponent} from './menu/menu.component';
import {FillProfileComponent, UpdatePhotoComponent} from './fill-profile/fill-profile.component';
import {SharedModule} from './shared/shared.module';
import {
  ErrorStateMatcher,
  MAT_CHECKBOX_CLICK_ACTION,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatNativeDateModule,
  ShowOnDirtyErrorStateMatcher
} from '@angular/material';
import {TestComponent} from './test/test.component';
import {MaterialModule} from './shared/material.module';
import {DialogComponent, EventsPageComponent} from './events-page/events-page.component';
import {DialogDetailComponent, EventCardComponent} from './events-page/event-card/event-card.component';
import {BackgroundDirective} from './shared/directives/background.directive';
import {FilterCityPipe} from './shared/pipes/filter-city.pipe';
import {FilterGlobalPipe} from './shared/pipes/filter-global.pipe';
import {AddEventFormComponent, AddEventSnackComponent} from './add-event-form/add-event-form.component';
import {BorderZeroDirective} from './shared/directives/borderZero.directive';
import {AgmCoreModule} from '@agm/core';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FlatpickrModule} from 'angularx-flatpickr';
import {TestSecondaryComponent} from './test-secondary/test-secondary.component';
import {CalendarComponent} from './calendar/calendar.component';
import {NotificationsComponent} from './notifications/notifications.component';
import {NotificationComponent} from './notifications/notification/notification.component';
import {FileDropModule} from 'ngx-file-drop';
import {CloudinaryConfiguration, CloudinaryModule} from '@cloudinary/angular-5.x';
import {Cloudinary} from 'cloudinary-core';
import {EmployeesComponent} from './employees/employees.component';
import {EmployeeComponent} from './employees/employee/employee.component';
import {EmployeeListComponent} from './employees/employee-list/employee-list.component';
import {
  ParticipationListComponent,
  UnsubscribeConfirmDialogComponent,
  VoteDialogComponent
} from './participation-list/participation-list.component';
import {AgmDirectionModule} from 'agm-direction';
import { MyEventsComponent } from './my-events/my-events.component';
import {
  InvitationConfirmationDialogComponent,
  MyEventInProgressComponent
} from './my-events/my-event-in-progress/my-event-in-progress.component';
import { MyEventPendingComponent } from './my-events/my-event-pending/my-event-pending.component';
import { MyEventDoneComponent } from './my-events/my-event-done/my-event-done.component';

@NgModule({
  declarations: [
    MainComponent,
    LoginComponent,
    RegistrationComponent,
    WelcomeComponent,
    MenuComponent,
    FillProfileComponent,
    TestComponent,
    EventsPageComponent,
    EventCardComponent,
    DialogDetailComponent,
    DialogComponent,
    FilterCityPipe,
    FilterGlobalPipe,
    AddEventFormComponent,
    BackgroundDirective,
    BorderZeroDirective,
    AddEventSnackComponent,
    TestSecondaryComponent,
    CalendarComponent,
    NotificationsComponent,
    NotificationComponent,
    UpdatePhotoComponent,
    EmployeesComponent,
    EmployeeComponent,
    EmployeeListComponent,
    ParticipationListComponent,
    UnsubscribeConfirmDialogComponent,
    VoteDialogComponent,
    MyEventsComponent,
    MyEventInProgressComponent,
    InvitationConfirmationDialogComponent,
    MyEventPendingComponent,
    MyEventDoneComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MainRoutingModule,
    SharedModule,
    MaterialModule,
    MatNativeDateModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgbModule,
    FileDropModule,
    CloudinaryModule.forRoot({Cloudinary}, {cloud_name: 'danielepel', upload_preset: 'bkahmhvk'} as CloudinaryConfiguration),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDIht5XWZ1k6-lVAbV9y7mGPKxyL6lkIeI',
      libraries: ['places']
    }),
    AgmDirectionModule
  ],
  providers: [
    {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check'},
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  entryComponents: [
    DialogComponent,
    EventsPageComponent,
    EventCardComponent,
    DialogDetailComponent,
    AddEventFormComponent,
    AddEventSnackComponent,
    FillProfileComponent,
    UpdatePhotoComponent,
    ParticipationListComponent,
    UnsubscribeConfirmDialogComponent,
    VoteDialogComponent,
    MyEventInProgressComponent,
    InvitationConfirmationDialogComponent
  ]
})
export class MainModule {
}
