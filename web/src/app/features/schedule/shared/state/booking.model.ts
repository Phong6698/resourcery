import {Project} from '../../../projects/state';
import {Resource} from '../../../resources/state';
import {Object} from 'parse';

export interface Booking {
  start: number;
  end: number;
  resource: Object<Resource>;
  project: Object<Project>;
}

export interface ParseBooking extends Object<Booking>{}

export function createBooking(params: Partial<ParseBooking>): ParseBooking {
  return {} as ParseBooking;
}
