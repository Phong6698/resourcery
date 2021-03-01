import {Injectable, OnDestroy} from '@angular/core';
import {ResourceStore} from './resource.store';
import * as Parse from 'parse';
import {LiveQuerySubscription, Object} from 'parse';
import {Resource} from './resource.model';
import {ID} from '@datorama/akita';
import {mapSimpleParseObject} from '../../../shared/parse-util';

@Injectable({providedIn: 'root'})
export class ResourceService implements OnDestroy {

  private static readonly CLASS_NAME = 'Resource';
  private subscription!: LiveQuerySubscription;

  constructor(private resourceStore: ResourceStore) {
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  load(): void {
    this.resourceStore.setLoading(true);
    const query = new Parse.Query<Object<Resource>>(ResourceService.CLASS_NAME);
    query.findAll().then(bookings => {
      this.resourceStore.set(bookings.map(mapSimpleParseObject));
      if (!this.subscription) {
        query.subscribe().then(subscription => {
          this.subscription = subscription;
          this.subscription.on('create', (res) => {
            this.resourceStore.add(mapSimpleParseObject(res as Object<Resource>));
          });
          this.subscription.on('delete', (res) => {
            this.resourceStore.remove(res.id);
          });
          this.subscription.on('update', (res) => {
            this.resourceStore.update(res.id, mapSimpleParseObject(res as Object<Resource>));
          });
        });
      }
      this.resourceStore.setLoading(false);
    });
  }

  async create(resource: Partial<Resource>): Promise<any> {
    const ResourceClass = Parse.Object.extend(ResourceService.CLASS_NAME);
    const newResource = new ResourceClass();
    return newResource.save(resource);
  }

  async delete(id: ID): Promise<any> {
    const query = new Parse.Query(ResourceService.CLASS_NAME);
    query.equalTo('objectId', id);
    const resource = await query.first();
    return resource?.destroy();
  }

  async update(editedResource: Partial<Resource>, id: ID): Promise<any> {
    const query = new Parse.Query(ResourceService.CLASS_NAME);
    query.equalTo('objectId', id);
    const resource = await query.first();
    return resource?.save(editedResource);
  }

}
