import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {environment} from '../../environments/environment';
import * as Parse from 'parse';

Parse.initialize(environment.PARSE_APP_ID, environment.PARSE_JS_KEY);
(Parse as any).serverURL = environment.serverURL;

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
