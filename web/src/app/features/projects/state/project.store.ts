import {Injectable} from '@angular/core';
import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {ParseProject} from './project.model';

export interface ProjectState extends EntityState<ParseProject> {
}

@Injectable({providedIn: 'root'})
@StoreConfig({
  name: 'project'
})
export class ProjectStore extends EntityStore<ProjectState> {

  constructor() {
    super();
  }

}
