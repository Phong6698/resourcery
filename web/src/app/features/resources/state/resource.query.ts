import {Injectable} from '@angular/core';
import {ID, QueryEntity} from '@datorama/akita';
import {ResourceState, ResourceStore} from './resource.store';
import {Resource} from './resource.model';
import {map} from 'rxjs/operators';
import {combineLatest, Observable} from 'rxjs';
import {BookingQuery} from '../../planner/state/booking.query';

@Injectable({providedIn: 'root'})
export class ResourceQuery extends QueryEntity<ResourceState> {

  resources$ = this.selectAll();

  constructor(protected store: ResourceStore, protected bookingQuery: BookingQuery) {
    super(store);
  }

  public getWithBookings(): Observable<Resource[]> {

    return combineLatest([
      this.selectAll(),
      this.bookingQuery.selectAll({asObject: true})
    ]).pipe(map(([resources, bookings]) => {
      return resources.map((resource: Resource) => {
        return {...resource, bookings: resource.bookings ? resource.bookings.map((id: ID) => bookings[id]) : []};
      });
    }));

    // return this.selectAll().pipe(map((resources: Resource[]) => {
    //   return resources.map((res: Resource) => {
    //     return {
    //       ...res,
    //       bookings: [
    //         createBooking({from: '02.01.2020', to: '11.01.2020'})
    //       ]
    //     };
    //   });
    // }));
  }

}
