import {NgModule} from '@angular/core';
import {BarRatingModule} from 'ngx-bar-rating';

@NgModule({
  imports: [BarRatingModule],
  exports: [BarRatingModule]
})
export class SharedModule {
}
