import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ID} from '@datorama/akita';
import {Project} from '../state';

@Component({
  selector: 'r-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {

  @Input() projects: Project[] | undefined | null;
  @Output() createProject = new EventEmitter<void>();
  @Output() editProject = new EventEmitter<Project>();
  @Output() deleteProject = new EventEmitter<ID>();

  constructor() {
  }

  ngOnInit(): void {
  }

  trackById = (item: any) => item.id;

  onCreateProject(): void {
    this.createProject.emit();
  }

  onEditProject(project: Project): void {
    this.editProject.emit(project);
  }

  onDeleteProject(id: ID): void {
    this.deleteProject.emit(id);
  }

}
