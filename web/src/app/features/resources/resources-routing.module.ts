import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ResourcesComponent} from './resources.component';
import {AuthenticationGuard} from '../../authentication/guard/authentication.guard';

const routes: Routes = [
  {
    path: '',
    component: ResourcesComponent,
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourcesRoutingModule {
}
