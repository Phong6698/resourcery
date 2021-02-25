import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BookingStore} from './booking.store';
import {Booking} from './booking.model';
import {Resource, ResourceStore} from '../../resources/state';
import {arrayAdd} from '@datorama/akita';

@Injectable({providedIn: 'root'})
export class BookingService {

  constructor(private bookingStore: BookingStore,
              private http: HttpClient,
              private resourceStore: ResourceStore) {
  }

  // get() {
  //   return this.http.get('').pipe(tap(entities => this.bookingStore.set(entities)));
  // }

  public create(booking: Booking, resource: Resource): void {
    this.bookingStore.add(booking);
    this.resourceStore.update(resource.id, ({bookings}) => ({
      bookings: arrayAdd(bookings, booking.id)
    }));

  }

}
