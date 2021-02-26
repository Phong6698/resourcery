import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ScheduleStore} from './schedule.store';

@Injectable({ providedIn: 'root' })
export class ScheduleService {

  constructor(private scheduleStore: ScheduleStore, private http: HttpClient) {
  }

  // get() {
  //   return this.http.get('').pipe(tap(entities => this.scheduleStore.update(entities)));
  // }

}
