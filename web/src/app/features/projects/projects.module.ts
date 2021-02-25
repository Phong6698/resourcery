import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProjectsRoutingModule} from './projects-routing.module';
import {ProjectListComponent} from './project-list/project-list.component';
import {ProjectFormDialogComponent} from './project-form-dialog/project-form-dialog.component';
import {SharedModule} from '../../shared/shared.module';
import {ProjectsComponent} from './projects.component';


@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectListComponent,
    ProjectFormDialogComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule
  ]
})
export class ProjectsModule {
}
