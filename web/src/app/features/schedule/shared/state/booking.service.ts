import {Injectable, OnDestroy} from '@angular/core';
import {BookingState, BookingStore} from './booking.store';
import * as Parse from 'parse';
import {LiveQuerySubscription} from 'parse';
import {Booking, ParseBooking} from './booking.model';
import {ID} from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class BookingService implements OnDestroy {

  private static readonly CLASS_NAME = 'Booking';
  private subscription!: LiveQuerySubscription;

  constructor(private bookingStore: BookingStore) {
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  load(): void {
    this.bookingStore.setLoading(true);
    const query = new Parse.Query<ParseBooking>(BookingService.CLASS_NAME);
    query.findAll().then(bookings => {
      this.bookingStore.set(bookings as BookingState);
      if (!this.subscription) {
        query.subscribe().then(subscription => {
          this.subscription = subscription;
          this.subscription.on('create', (res: ParseBooking) => {
            this.bookingStore.add(res);
          });
          this.subscription.on('delete', (res) => {
            this.bookingStore.remove(res.id);
          });
          this.subscription.on('update', (res: ParseBooking) => {
            this.bookingStore.update(res.id, res);
          });
        });
      }
      this.bookingStore.setLoading(false);
    });
  }

  // TODO relationship with resource and project
  async create(booking: Partial<Booking>): Promise<void> {
    this.bookingStore.setLoading(true);
    const BookingClass = Parse.Object.extend(BookingService.CLASS_NAME);
    const newBooking = new BookingClass();
    await newBooking.save(booking);
    this.bookingStore.setLoading(false);
  }

  async delete(id: ID): Promise<void> {
    this.bookingStore.setLoading(true);
    const query = new Parse.Query(BookingService.CLASS_NAME);
    query.equalTo('objectId', id);
    const booking = await query.first();
    await booking?.destroy();
    this.bookingStore.setLoading(false);
  }

  async update(editedBooking: Partial<Booking>, id: ID): Promise<void> {
    this.bookingStore.setLoading(true);
    const query = new Parse.Query(BookingService.CLASS_NAME);
    query.equalTo('objectId', id);
    const booking = await query.first();
    await booking?.save(editedBooking);
    this.bookingStore.setLoading(false);
  }
}
