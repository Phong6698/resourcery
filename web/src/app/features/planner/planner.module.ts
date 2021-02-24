import {NgModule} from '@angular/core';
import {PlannerComponent} from './planner.component';
import {SharedModule} from '../../shared/shared.module';
import {PlannerRoutingModule} from './planner-routing.module';

import * as components from './components';


@NgModule({
  declarations: [
    ...components.list,
    PlannerComponent,
  ],
  imports: [
    SharedModule,
    PlannerRoutingModule
  ]
})
export class PlannerModule {
}
