import {Injectable} from '@angular/core';
import {guid, QueryEntity} from '@datorama/akita';
import {ResourceState, ResourceStore} from './resource.store';
import {Resource} from './resource.model';
import {map, mergeMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Booking, createBooking} from '../../planner/state';

@Injectable({providedIn: 'root'})
export class ResourceQuery extends QueryEntity<ResourceState> {

  resources$ = this.selectAll();

  constructor(protected store: ResourceStore) {
    super(store);
  }

  public getWithBookings(): Observable<Resource[]>{
    return this.selectAll().pipe(map((resources: Resource[]) => {
      return resources.map((res: Resource) => {
        return {
          ...res,
          bookings: [
            createBooking({from: '02.01.2020', to: '11.01.2020'})
          ]
        };
      });
    }));
  }

}
