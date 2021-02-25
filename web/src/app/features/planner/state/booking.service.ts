import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BookingStore} from './booking.store';

@Injectable({ providedIn: 'root' })
export class BookingService {

  constructor(private bookingStore: BookingStore, private http: HttpClient) {
  }

  // get() {
  //   return this.http.get('').pipe(tap(entities => this.bookingStore.set(entities)));
  // }

}
