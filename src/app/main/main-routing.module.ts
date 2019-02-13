import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {FillProfileComponent} from './fill-profile/fill-profile.component';
import {TestComponent} from './test/test.component';
import {EventsPageComponent} from './events-page/events-page.component';
import {AddEventFormComponent} from './add-event-form/add-event-form.component';
import {TestSecondaryComponent} from './test-secondary/test-secondary.component';
import {CalendarComponent} from './calendar/calendar.component';

const routes: Routes = [
  {
    path: 'main', component: MainComponent, children: [
      {path: 'welcome', component: WelcomeComponent},
      {path: 'fill-profile', component: FillProfileComponent},
      {path: 'test', component: TestComponent},
      {path: 'test_secondary', component: TestSecondaryComponent},
      {path: 'events', component: EventsPageComponent},
      {path: 'add-event', component: AddEventFormComponent},
      {path: 'calendar', component: CalendarComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
