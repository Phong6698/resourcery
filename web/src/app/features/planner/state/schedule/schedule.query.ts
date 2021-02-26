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

      console.log(months)
      let response = [];
      months.map((month: moment.Moment) => {
        console.log(this.makeDays(month));
        // response = [...response, this.makeDays(month)];
        response = Array.prototype.concat.apply(this.makeDays(month), response);
      });

      console.log(response.sort((a, b) => {
        if (a.month > b.month){
          return 1;
        }

        if (a.month < b.month){
          return -1;
        }

        return 0;

      }));
      return response;
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
      return {
        name: monthName,
        dayName:  moment(`${day}.${month}.${year}`, 'DD.MM.YYYY').format('dd'),
        day,
        month,
        year,
      };
    });

  }

}
