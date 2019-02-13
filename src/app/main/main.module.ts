import {NgModule} from '@angular/core';
import {MainComponent} from './main.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MainRoutingModule} from './main-routing.module';
import {LoginComponent} from './shared/components/login/login.component';
import {RegistrationComponent} from './shared/components/registration/registration.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {MenuComponent} from './menu/menu.component';
import {FillProfileComponent} from './fill-profile/fill-profile.component';
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
import { FlatpickrModule } from 'angularx-flatpickr';
import { TestSecondaryComponent } from './test-secondary/test-secondary.component';
import { CalendarComponent } from './calendar/calendar.component';

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
    CalendarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MainRoutingModule,
    SharedModule,
    MaterialModule,
    MatNativeDateModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDIht5XWZ1k6-lVAbV9y7mGPKxyL6lkIeI'
    }),
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgbModule
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
    AddEventSnackComponent
  ]
})
export class MainModule {
}
