import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ResourcesRoutingModule} from './resources-routing.module';
import {ResourcesComponent} from './resources.component';
import {SharedModule} from '../../shared/shared.module';
import {ResourceListComponent} from './resource-list/resource-list.component';
import {ResourceFormDialogComponent} from './resource-form-dialog/resource-form-dialog.component';


@NgModule({
  declarations: [
    ResourcesComponent,
    ResourceListComponent,
    ResourceFormDialogComponent
  ],
  imports: [
    CommonModule,
    ResourcesRoutingModule,
    SharedModule,
  ],
})
export class ResourcesModule {
}
