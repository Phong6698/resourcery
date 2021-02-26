import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PlannerComponent} from './planner.component';
import {AuthenticationGuard} from '../../authentication/guard/authentication.guard';

const routes: Routes = [
  {
    path: '',
    component: PlannerComponent,
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlannerRoutingModule {
}
