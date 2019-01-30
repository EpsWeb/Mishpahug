import {Pipe, PipeTransform} from '@angular/core';
import {MishEvent} from '../models/event.model';
import * as moment from 'moment';

@Pipe({
  name: 'maxFilterGlobal'
})
export class FilterGlobalPipe implements PipeTransform {

  transform(events: MishEvent[], food: string, confession: string, holiday: string, dateFrom: string, dateTo): any {
    if (food === '' && confession === '' && holiday === '' && dateFrom === '' && dateTo === '') {
      return events;
    }

    return events.filter((e) => {
      const t = Object.assign({}, e);

      let foodConfirm = true;
      let confessionConfirm = true;
      let holidayConfirm = true;
      let dateFromConfirm  = true;
      let dateToConfirm = true;

      const dateEvent = moment(t['date'], 'DD.MM.YYYY').format('YYYY-MM-DD');

      if (food) {
        foodConfirm = t['food'].indexOf(food) !== -1;
      }

      if (confession) {
        confessionConfirm = t['confession'] === confession;
      }

      if (holiday) {
        holidayConfirm = t['holiday'] === holiday;
      }

      if (dateFrom) {
        dateFromConfirm = moment(dateEvent).isAfter(dateFrom);
      }

      if (dateTo) {
        dateToConfirm = moment(dateEvent).isBefore(dateTo);
      }

      return foodConfirm && confessionConfirm && holidayConfirm && dateFromConfirm && dateToConfirm;
    });

  }

}






