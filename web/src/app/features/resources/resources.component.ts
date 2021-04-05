import {Component, OnDestroy, OnInit} from '@angular/core';
import {ParseResource, ResourceQuery, ResourceService, ResourceType} from './state';
import {NbDialogService} from '@nebular/theme';
import {ResourceFormDialogComponent} from './resource-form-dialog/resource-form-dialog.component';
import {filter, switchMap, takeUntil} from 'rxjs/operators';
import {from, Subject} from 'rxjs';

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
    this.resourceService.load();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  addResource(): void {
    this.resourceService.create(
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
      switchMap(resource => from(this.resourceService.create(resource)))
    ).subscribe(console.log);
  }

  editResource(resource: ParseResource): void {
    this.nbDialogService.open(
      ResourceFormDialogComponent, {context: {resource}}
    ).onClose.pipe(
      takeUntil(this.onDestroy$),
      filter(editedResource => !!editedResource),
      switchMap(editedResource => from(this.resourceService.update(resource.id, editedResource)))
    ).subscribe(console.log);
  }

  deleteResource(id: string): void {
    this.resourceService.delete(id).then(console.log);
  }

}
