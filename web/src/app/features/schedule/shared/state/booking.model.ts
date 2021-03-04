import {ID} from '@datorama/akita';
import {Project} from '../../../projects/state';
import {Resource} from '../../../resources/state';


// TODO maybe make it to Parse.Query<Object<Booking>> so we don't have to map and use relations easier
export interface Booking {
  id: ID;
  start: number;
  end: number;
  resource: Resource;
  project: Project;
}

export function createBooking(params: Partial<Booking>): Booking {
  return {} as Booking;
}
