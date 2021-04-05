import {Injectable, OnDestroy} from '@angular/core';
import {ProjectStore} from './project.store';
import * as Parse from 'parse';
import {LiveQuerySubscription} from 'parse';
import {ParseProject, Project} from './project.model';

@Injectable({providedIn: 'root'})
export class ProjectService implements OnDestroy {

  static readonly CLASS_NAME = 'Project';

  private subscription!: LiveQuerySubscription;

  constructor(protected projectStore: ProjectStore) {
    this.initProjects().then();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private async initProjects(): Promise<any> {
    const query = new Parse.Query<ParseProject>(ProjectService.CLASS_NAME);
    this.subscription = await query.subscribe();
    const projects = await query.findAll();
    this.projectStore.set(projects);
    this.subscription.on('create', (pj: ParseProject) => {
      this.projectStore.add(pj);
    });
    this.subscription.on('delete', (pj) => {
      this.projectStore.remove(pj.id);
    });
    this.subscription.on('update', (pj: ParseProject) => {
      this.projectStore.replace(pj.id, pj);
    });
  }

  async createProject(project: Partial<Project>): Promise<any> {
    const ProjectClass = Parse.Object.extend(ProjectService.CLASS_NAME);
    const newProject = new ProjectClass();
    return newProject.save(project);
  }

  async deleteProject(id: string): Promise<any> {
    const query = new Parse.Query(ProjectService.CLASS_NAME);
    query.equalTo('objectId', id);
    const project = await query.first();
    return project?.destroy();
  }

  async updateProject(id: string, editedProject: Partial<Project>): Promise<any> {
    const query = new Parse.Query(ProjectService.CLASS_NAME);
    query.equalTo('objectId', id);
    const project = await query.first();
    return project?.save(editedProject);
  }

}
