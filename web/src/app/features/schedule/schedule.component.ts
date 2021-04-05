import {Component, ElementRef, OnInit} from '@angular/core';
import {Booking, BookingQuery, BookingService, ParseBooking} from './shared/state';
import {combineLatest, Observable} from 'rxjs';
import {ScheduleBooking} from './shared/schedule-booking.model';
import {map} from 'rxjs/operators';
import {ParseResource, ResourceQuery, ResourceService} from '../resources/state';
import * as Parse from 'parse';
import {ProjectService} from '../projects/state';

@Component({
  selector: 'r-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  resources$: Observable<ParseResource[]>;
  scheduleBookings$: Observable<ScheduleBooking[]>;

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
    this.scheduleBookings$ = combineLatest([this.bookingQuery.bookings$, this.resources$]).pipe(
      map(([bookings, resources]) =>
        bookings.map(booking =>
          this.mapToScheduleBookings(booking, resources, this.dates)))
    );
  }

  private mapToScheduleBookings = (booking: ParseBooking, resources: ParseResource[], dates: number[]): ScheduleBooking => {
    const dateStartIndex = dates.findIndex(date => date === booking.attributes.start);
    const dateEndIndex = dates.findIndex(date => date === booking.attributes.end);
    const resourceIndex = resources.findIndex(res => res.id === booking.attributes.resource.id);
    return {booking, schedulePosition: {dateStartIndex, dateEndIndex, resourceIndex}};
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

  onDayClick(day: number, resource: ParseResource): void {
    const ProjectClass = Parse.Object.extend(ProjectService.CLASS_NAME);
    const project = new ProjectClass();
    project.set('id', 1);
    project.set('name', 'Project');
    project.set('description', 'Test');
    const newBooking = {
      start: day,
      end: day,
      resource,
      project,
    } as Booking;
    this.bookingService.create(newBooking).then();
  }
}
