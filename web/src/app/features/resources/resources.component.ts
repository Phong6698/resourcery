import {Component, OnDestroy, OnInit} from '@angular/core';
import {Resource, ResourceQuery, ResourceService, ResourceType} from './state';
import {ID} from '@datorama/akita';
import {NbDialogService} from '@nebular/theme';
import {ResourceFormDialogComponent} from './resource-form-dialog/resource-form-dialog.component';
import {filter, switchMap, takeUntil} from 'rxjs/operators';
import {of, Subject} from 'rxjs';

@Component({
  selector: 'r-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();

  resources$ = this.resourceQuery.resources$;

  constructor(
    private resourceService: ResourceService,
    private resourceQuery: ResourceQuery,
    private nbDialogService: NbDialogService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  addResource(): void {
    this.resourceService.createResource(
      {
        firstname: 'Phong',
        lastname: 'Penglerd',
        type: ResourceType.PERSON
      }
    ).then(res => console.log(res));
  }

  createResource(): void {
    this.nbDialogService.open(ResourceFormDialogComponent).onClose.pipe(
      takeUntil(this.onDestroy$),
      filter(resource => !!resource),
      switchMap(resource => of(this.resourceService.createResource(resource)))
    ).subscribe(console.log);
  }

  editResource(resource: Resource): void {
    this.nbDialogService.open(
      ResourceFormDialogComponent, {context: {resource}}
    ).onClose.pipe(
      takeUntil(this.onDestroy$),
      filter(editedResource => !!editedResource),
      switchMap(editedResource => of(this.resourceService.updateResource(editedResource, resource.id)))
    ).subscribe(console.log);
  }

  deleteResource(id: ID): void {
    this.resourceService.deleteResource(id).then(console.log);
  }

}
