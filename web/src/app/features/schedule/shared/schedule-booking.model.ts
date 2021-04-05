import {ParseBooking} from './state';

export interface ScheduleBooking {
  booking: ParseBooking;
  schedulePosition: {
    dateStartIndex: number;
    dateEndIndex: number;
    resourceIndex: number;
  };
}
