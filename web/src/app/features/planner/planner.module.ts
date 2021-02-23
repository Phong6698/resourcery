import {NgModule} from '@angular/core';
import {PlannerComponent} from './planner.component';
import {SharedModule} from '../../shared/shared.module';
import {PlannerRoutingModule} from './planner-routing.module';


@NgModule({
  declarations: [PlannerComponent],
  imports: [
    SharedModule,
    PlannerRoutingModule
  ]
})
export class PlannerModule {
}
