import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
const Parse = require('parse');
import {environment} from '../../environments/environment';

Parse.initialize(environment.PARSE_APP_ID, environment.PARSE_JS_KEY);
(Parse as any).serverURL = environment.serverURL;

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
