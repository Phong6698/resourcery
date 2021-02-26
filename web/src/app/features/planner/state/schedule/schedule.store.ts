import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import * as moment from 'moment';

export interface ScheduleState {
  key: string;
  currentYear: number;
}

export function createInitialState(): ScheduleState {
  return {
    key: '',
    currentYear: moment().year()
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'schedule' })
export class ScheduleStore extends Store<ScheduleState> {

  constructor() {
    super(createInitialState());
  }

}
