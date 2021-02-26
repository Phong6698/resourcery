import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectsComponent} from './projects.component';
import {AuthenticationGuard} from '../../authentication/guard/authentication.guard';

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule {
}
