import {Pipe, PipeTransform} from '@angular/core';
import {MishEvent} from '../models/event.model';

@Pipe({
  name: 'maxFilterCity'
})
export class FilterCityPipe implements PipeTransform {

  transform(events: MishEvent[], selectedCity: string): any {
    if (selectedCity === '' || selectedCity === 'None') {
      return events;
    }

    return events.filter((e) => {
      const t = Object.assign({}, e);

      // if (!isNaN(t[field])) {
      //   t[field] += '';
      // }


      return t['address']['city'] === selectedCity;
    });

  }

}
