import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ParseResource} from '../state';

@Component({
  selector: 'r-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResourceListComponent implements OnInit {

  @Input() resources: ParseResource[] | undefined | null;
  @Output() createResource = new EventEmitter<void>();
  @Output() editResource = new EventEmitter<ParseResource>();
  @Output() deleteResource = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  trackById = (item: any) => item.id;

  onCreateResource(): void {
    this.createResource.emit();
  }

  onEditResource(resource: ParseResource): void {
    this.editResource.emit(resource);
  }

  onDeleteResource(id: string): void {
    this.deleteResource.emit(id);
  }
}
