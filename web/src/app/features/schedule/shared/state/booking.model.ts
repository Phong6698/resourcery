import {ID} from '@datorama/akita';
import {Project} from '../../../projects/state';
import {Resource, ResourceType} from '../../../resources/state';

export interface Booking {
  id: ID;
  start: number;
  end: number;
  resource: Resource;
  project: Project;
}

export function createBooking(params: Partial<Booking>): Booking {
  return {
    start: new Date(2021, 0, 2).getTime(),
    end: new Date(2021, 0, 5).getTime(),
    resource: {
      id: 1,
      firstname: 'Phong',
      lastname: 'Penglerd',
      type: ResourceType.PERSON,
    },
    project: {
      id: 1,
      name: 'Project'
    }
  } as Booking;
}
