import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { BookingStore, BookingState } from './booking.store';

@Injectable({ providedIn: 'root' })
export class BookingQuery extends QueryEntity<BookingState> {

  constructor(protected store: BookingStore) {
    super(store);
  }

}
