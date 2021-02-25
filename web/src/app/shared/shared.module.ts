import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import * as components from './components';
import {NebularModule} from './nebular.module';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    ...components.list,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NebularModule,
    HttpClientModule,
  ],
  exports: [
    ...components.list,
    CommonModule,
    RouterModule,
    NebularModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class SharedModule {
}
