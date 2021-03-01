import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {BookingState, BookingStore} from './booking.store';

@Injectable({providedIn: 'root'})
export class BookingQuery extends QueryEntity<BookingState> {

  bookings$ = this.selectAll();

  constructor(protected store: BookingStore) {
    super(store);
  }

}
