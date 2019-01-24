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
import {MAT_CHECKBOX_CLICK_ACTION} from '@angular/material';

@NgModule({
  declarations: [
    MainComponent,
    LoginComponent,
    RegistrationComponent,
    WelcomeComponent,
    MenuComponent,
    FillProfileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MainRoutingModule,
    SharedModule
  ],
  providers: [
    {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check'}
  ]
})
export class MainModule {
}
