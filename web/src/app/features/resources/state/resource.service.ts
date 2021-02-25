import {Injectable, OnDestroy} from '@angular/core';
import {ResourceStore} from './resource.store';
import * as Parse from 'parse';
import {LiveQuerySubscription, Object} from 'parse';
import {Resource} from './resource.model';
import {ID} from '@datorama/akita';

@Injectable({providedIn: 'root'})
export class ResourceService implements OnDestroy {

  private static readonly CLASS_NAME = 'Resource';

  private subscription!: LiveQuerySubscription;

  constructor(private resourceStore: ResourceStore) {
    this.initResources().then();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private async initResources(): Promise<any> {
    const query = new Parse.Query<Object<Resource>>(ResourceService.CLASS_NAME);
    this.subscription = await query.subscribe();
    const resources = await query.findAll();
    this.resourceStore.set(resources.map(this.mapParseResource));
    this.subscription.on('create', (res) => {
      this.resourceStore.add(this.mapParseResource(res as Object<Resource>));
    });
    this.subscription.on('delete', (res) => {
      this.resourceStore.remove(res.id);
    });
    this.subscription.on('update', (res) => {
      this.resourceStore.update(res.id, this.mapParseResource(res as Object<Resource>));
    });
  }

  async createResource(resource: Partial<Resource>): Promise<any> {
    const ResourceClass = Parse.Object.extend(ResourceService.CLASS_NAME);
    const newResource = new ResourceClass();
    return newResource.save(resource);
  }

  async deleteResource(id: ID): Promise<any> {
    const query = new Parse.Query(ResourceService.CLASS_NAME);
    query.equalTo('objectId', id);
    const resource = await query.first();
    return resource?.destroy();
  }

  async updateResource(editedResource: Partial<Resource>, id: ID): Promise<any> {
    const query = new Parse.Query(ResourceService.CLASS_NAME);
    query.equalTo('objectId', id);
    const resource = await query.first();
    return resource?.save(editedResource);
  }

  private mapParseResource = (resource: Object<Resource>): Resource => ({...resource.attributes, id: resource.id});

}
