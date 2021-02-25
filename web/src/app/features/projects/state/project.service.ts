import {Injectable, OnDestroy} from '@angular/core';
import {ProjectStore} from './project.store';
import {LiveQuerySubscription, Object} from 'parse';
import * as Parse from 'parse';
import {ID} from '@datorama/akita';
import {Project} from './project.model';

@Injectable({providedIn: 'root'})
export class ProjectService implements OnDestroy {

  private static readonly CLASS_NAME = 'Project';

  private subscription!: LiveQuerySubscription;

  constructor(protected projectStore: ProjectStore) {
    this.initProjects().then();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private async initProjects(): Promise<any> {
    const query = new Parse.Query<Object<Project>>(ProjectService.CLASS_NAME);
    this.subscription = await query.subscribe();
    const projects = await query.findAll();
    this.projectStore.set(projects.map(this.mapParseProject));
    this.subscription.on('create', (pj) => {
      this.projectStore.add(this.mapParseProject(pj as Object<Project>));
    });
    this.subscription.on('delete', (pj) => {
      this.projectStore.remove(pj.id);
    });
    this.subscription.on('update', (pj) => {
      this.projectStore.update(pj.id, this.mapParseProject(pj as Object<Project>));
    });
  }

  async createProject(project: Partial<Project>): Promise<any> {
    const ProjectClass = Parse.Object.extend(ProjectService.CLASS_NAME);
    const newProject = new ProjectClass();
    return newProject.save(project);
  }

  async deleteProject(id: ID): Promise<any> {
    const query = new Parse.Query(ProjectService.CLASS_NAME);
    query.equalTo('objectId', id);
    const project = await query.first();
    return project?.destroy();
  }

  async updateProject(editedProject: Partial<Project>, id: ID): Promise<any> {
    const query = new Parse.Query(ProjectService.CLASS_NAME);
    query.equalTo('objectId', id);
    const project = await query.first();
    return project?.save(editedProject);
  }

  private mapParseProject = (project: Object<Project>): Project => ({...project.attributes, id: project.id});

}
