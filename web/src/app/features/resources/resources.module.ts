import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ResourcesRoutingModule} from './resources-routing.module';
import {ResourcesComponent} from './resources.component';


@NgModule({
  declarations: [ResourcesComponent],
  imports: [
    CommonModule,
    ResourcesRoutingModule
  ]
})
export class ResourcesModule {
}
