import {Injectable} from '@angular/core';
import {Query} from '@datorama/akita';
import {ScheduleState, ScheduleStore} from './schedule.store';
import {Observable} from 'rxjs';
import {ScheduleColumn} from './schedule-column.interface';
import {map} from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({providedIn: 'root'})
export class ScheduleQuery extends Query<ScheduleState> {

  private readonly MONTHS = Array.from({length: 12}, (_, i) => i + 1);

  constructor(protected store: ScheduleStore) {
    super(store);
  }


  selectYearlySchedule(): Observable<ScheduleColumn[]> {
    return this.select((state => state.currentYear)).pipe(map((year: number) => {

      const months = this.makeMonths(year);

      let response = [];
      months.map((month: moment.Moment) => {
        response = Array.prototype.concat.apply(this.makeDays(month), response);
      });

      return response.sort((a, b) => {
        if (a.month > b.month){
          return 1;
        }

        if (a.month < b.month){
          return -1;
        }
        return 0;
      });
    }));
  }


  private makeMonths(year: number): moment.Moment[] {
    return this.MONTHS.map(month => {
      return moment(`${1}.${month}.${year}`, 'DD.MM.YYYY');
    });
  }

  private makeDays(reference: moment.Moment): ScheduleColumn[] {
    const days = reference.daysInMonth();
    const month = reference.month() + 1;
    const monthName = reference.format('MMMM');
    const year = reference.year();

    return Array.from({length: days}, (_, i) => i + 1).map(day => {
      const instance = moment(`${day}.${month}.${year}`, 'DD.MM.YYYY');
      return {
        name: monthName,
        dayName:  instance.format('dd'),
        day,
        date: instance.format('DD.MM.YYYY')
      };
    });

  }

}
