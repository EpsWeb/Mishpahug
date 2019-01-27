import {NgModule} from '@angular/core';
import {MainComponent} from './main.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MainRoutingModule} from './main-routing.module';
import { LoginComponent } from './shared/components/login/login.component';
import { RegistrationComponent } from './shared/components/registration/registration.component';
import {WelcomeComponent} from './welcome/welcome.component';
import { MenuComponent } from './menu/menu.component';
import { FillProfileComponent } from './fill-profile/fill-profile.component';
import {SharedModule} from './shared/shared.module';
import {ErrorStateMatcher, MAT_CHECKBOX_CLICK_ACTION, ShowOnDirtyErrorStateMatcher} from '@angular/material';
import {TestComponent} from './test/test.component';
import {MaterialModule} from './shared/material.module';
import { EventsPageComponent } from './events-page/events-page.component';
import { EventCardComponent } from './events-page/event-card/event-card.component';

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
    EventCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MainRoutingModule,
    SharedModule,
    MaterialModule
  ],
  providers: [
    {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check'},
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ]
})
export class MainModule {
}
