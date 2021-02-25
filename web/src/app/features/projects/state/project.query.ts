import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {ProjectStore, ProjectState} from './project.store';

@Injectable({providedIn: 'root'})
export class ProjectQuery extends QueryEntity<ProjectState> {

  projects$ = this.selectAll();

  constructor(protected store: ProjectStore) {
    super(store);
  }

}
