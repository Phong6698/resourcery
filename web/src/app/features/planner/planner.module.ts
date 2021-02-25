import {NgModule} from '@angular/core';
import {PlannerComponent} from './planner.component';
import {SharedModule} from '../../shared/shared.module';
import {PlannerRoutingModule} from './planner-routing.module';

import * as components from './components';
import {BookingDirective} from './directives/booking.directive';
import {CommonModule} from '@angular/common';
import {NbDialogModule} from '@nebular/theme';


@NgModule({
  declarations: [
    ...components.list,
    BookingDirective,
    PlannerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PlannerRoutingModule,
  ]
})
export class PlannerModule {
}
