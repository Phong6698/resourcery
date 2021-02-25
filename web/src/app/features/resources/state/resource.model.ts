import {ID} from '@datorama/akita';
import {Booking} from '../../planner/state/booking.model';

export interface Resource {
  id: ID;
  firstname: string;
  lastname: string;
  type: ResourceType;
  createdAt: Date;
  updatedAt: Date;
  bookings?: (Booking | ID)[];
}

export enum ResourceType {
  PERSON = 'PERSON'
}

export function createResource(params: Partial<Resource>): Resource {
  return {} as Resource;
}
