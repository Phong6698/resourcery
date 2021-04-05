import {Injectable} from '@angular/core';
import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {ParseResource} from './resource.model';

export interface ResourceState extends EntityState<ParseResource> {
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
