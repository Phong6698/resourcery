import {Component, OnDestroy, OnInit} from '@angular/core';
import {from, Subject} from 'rxjs';
import {NbDialogService} from '@nebular/theme';
import {ParseProject, ProjectQuery, ProjectService} from './state';
import {filter, switchMap, takeUntil} from 'rxjs/operators';
import {ProjectFormDialogComponent} from './project-form-dialog/project-form-dialog.component';

@Component({
  selector: 'r-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {

  private onDestroy$ = new Subject<void>();

  projects$ = this.projectQuery.projects$;

  constructor(
    private projectService: ProjectService,
    private projectQuery: ProjectQuery,
    private nbDialogService: NbDialogService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  addProject(): void {
    this.projectService.createProject(
      {
        name: 'ProjectX',
        description: 'Die grösste Party ever'
      }
    ).then(pj => console.log(pj));
  }

  createProject(): void {
    this.nbDialogService.open(ProjectFormDialogComponent).onClose.pipe(
      takeUntil(this.onDestroy$),
      filter(project => !!project),
      switchMap(project => from(this.projectService.createProject(project)))
    ).subscribe(console.log);
  }

  editProject(project: ParseProject): void {
    this.nbDialogService.open(
      ProjectFormDialogComponent, {context: {project}}
    ).onClose.pipe(
      takeUntil(this.onDestroy$),
      filter(editedProject => !!editedProject),
      switchMap(editedProject => from(this.projectService.updateProject(project.id, editedProject)))
    ).subscribe(console.log);
  }

  deleteProject(id: string): void {
    this.projectService.deleteProject(id).then(console.log);
  }

}
