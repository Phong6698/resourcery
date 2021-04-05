import {Object} from 'parse';

export interface Resource {
  firstname: string;
  lastname: string;
  type: ResourceType;
  createdAt: Date;
  updatedAt: Date;
}

export enum ResourceType {
  PERSON = 'PERSON'
}

export interface ParseResource extends Object<Resource>{}


export function createParseResource(params: Partial<ParseResource>): ParseResource {
  return {} as ParseResource;
}
