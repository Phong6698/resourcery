import {Injectable} from '@angular/core';
import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {Resource} from './resource.model';

export interface ResourceState extends EntityState<Resource> {
}

@Injectable({providedIn: 'root'})
@StoreConfig({
  name: 'resource'
})
export class ResourceStore extends EntityStore<ResourceState> {

  constructor() {
    super();
  }

}
