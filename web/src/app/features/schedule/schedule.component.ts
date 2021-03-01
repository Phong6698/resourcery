import {Component, ElementRef, OnInit} from '@angular/core';
import {Booking, BookingQuery, BookingService} from './shared/state';
import {combineLatest, Observable} from 'rxjs';
import {ScheduleBooking} from './shared/schedule-booking.model';
import {map} from 'rxjs/operators';
import {Resource, ResourceQuery, ResourceService} from '../resources/state';

@Component({
  selector: 'r-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  resources$: Observable<Resource[]>;
  bookings$: Observable<ScheduleBooking[]>;

  dates: number[];
  months: { dates: Date[] }[];

  constructor(
    private elementRef: ElementRef,
    private bookingQuery: BookingQuery,
    private bookingService: BookingService,
    private resourceQuery: ResourceQuery,
    private resourceService: ResourceService,
  ) {
  }

  ngOnInit(): void {
    this.resourceService.load();
    this.bookingService.load();
    const today = new Date();
    const startDate = new Date(today.getFullYear(), 0, 1);
    const endDate = new Date(today.getFullYear(), 11, 31);
    this.dates = this.getDates(startDate, endDate).map(date => date.valueOf());
    this.months = this.getDatesGroupedByMonths(this.getDates(startDate, endDate));
    this.resources$ = this.resourceQuery.resources$;
    this.bookings$ = combineLatest([this.bookingQuery.bookings$, this.resources$]).pipe(
      map(([bookings, resources]) =>
        bookings.map(booking =>
          this.mapToScheduleBookings(booking, resources, this.dates)))
    );
  }

  private mapToScheduleBookings = (booking: Booking, resources: Resource[], dates: number[]): ScheduleBooking => {
    const dateStartIndex = dates.findIndex(date => date === booking.start);
    const dateEndIndex = dates.findIndex(date => date === booking.end);
    const resourceIndex = resources.findIndex(res => res.id === booking.resource.id);
    return {...booking, schedulePosition: {dateStartIndex, dateEndIndex, resourceIndex}};
  }

  // TODO change to momentjs
  private getDates(startDate: Date, endDate: Date): Date[] {
    const dates = [];
    const currentDate = new Date(startDate.valueOf());
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  }

  private getDatesGroupedByMonths(dates: Date[]): { dates: Date[] }[] {
    return [...new Array(12)]
      .map(
        (i, month) => ({
          dates: dates
            .filter(date => date.getMonth() === month)
            .sort((a, b) => a.getTime() - b.getTime())
        })
      );
  }

  onDayClick(day: number, resource: Resource): void {
    const newBooking = {
      start: day,
      end: day,
      resource,
      project: {
        id: 1,
        name: 'Project',
        description: 'Test',
      }
    } as Booking;
    this.bookingService.create(newBooking).then();
  }
}
