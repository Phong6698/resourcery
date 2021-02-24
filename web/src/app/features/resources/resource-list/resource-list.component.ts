import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Resource} from '../state';
import {ID} from '@datorama/akita';

@Component({
  selector: 'r-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourceListComponent implements OnInit {

  @Input() resources: Resource[] | undefined | null;
  @Output() createResource = new EventEmitter<void>();
  @Output() editResource = new EventEmitter<Resource>();
  @Output() deleteResource = new EventEmitter<ID>();

  constructor() {
  }

  ngOnInit(): void {
  }

  trackById = (item: any) => item.id;

  onCreateResource(): void {
    this.createResource.emit();
  }

  onEditResource(resource: Resource): void {
    this.editResource.emit(resource);
  }

  onDeleteResource(id: ID): void {
    this.deleteResource.emit(id);
  }
}
