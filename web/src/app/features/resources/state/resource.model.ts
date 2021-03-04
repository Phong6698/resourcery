import {ID} from '@datorama/akita';

export interface Resource {
  id: ID;
  firstname: string;
  lastname: string;
  type: ResourceType;
  createdAt: Date;
  updatedAt: Date;
}

export enum ResourceType {
  PERSON = 'PERSON'
}

export function createResource(params: Partial<Resource>): Resource {
  return {} as Resource;
}
