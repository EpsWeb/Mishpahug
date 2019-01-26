import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {FillProfileComponent} from './fill-profile/fill-profile.component';
import {TestComponent} from './test/test.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      {path: 'welcome', component: WelcomeComponent},
      {path: 'fill-profile', component: FillProfileComponent},
      {path: 'test', component: TestComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
