import {guid, ID} from '@datorama/akita';

export interface Booking {
  id?: ID;
  top: number;
  left: number;
  from: string;
  to: string;
}

export function createBooking(params: Partial<Booking>): Booking {
  return {
    id: guid(),
    ...params
  } as Booking;
}
