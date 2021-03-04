import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {ResourceState, ResourceStore} from './resource.store';

@Injectable({providedIn: 'root'})
export class ResourceQuery extends QueryEntity<ResourceState> {

  resources$ = this.selectAll();

  constructor(protected store: ResourceStore) {
    super(store);
  }
}
