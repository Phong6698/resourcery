import {Injectable} from '@angular/core';
import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {ParseBooking} from './booking.model';

export interface BookingState extends EntityState<ParseBooking> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'booking'
})
export class BookingStore extends EntityStore<BookingState> {

  constructor() {
    super();
  }

}
