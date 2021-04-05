import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ParseProject} from '../state';

@Component({
  selector: 'r-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {

  @Input() projects: ParseProject[] | undefined | null;
  @Output() createProject = new EventEmitter<void>();
  @Output() editProject = new EventEmitter<ParseProject>();
  @Output() deleteProject = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  trackById = (item: any) => item.id;

  onCreateProject(): void {
    this.createProject.emit();
  }

  onEditProject(project: ParseProject): void {
    this.editProject.emit(project);
  }

  onDeleteProject(id: string): void {
    this.deleteProject.emit(id);
  }

}
