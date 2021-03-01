import {Booking} from './state';

export interface ScheduleBooking extends Booking {
  schedulePosition: {
    dateStartIndex: number;
    dateEndIndex: number;
    resourceIndex: number;
  };
}
