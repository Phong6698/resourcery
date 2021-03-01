import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthenticationRoutingModule} from './authentication-routing.module';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {NbAlertModule, NbButtonModule, NbCardModule, NbInputModule} from '@nebular/theme';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    NbCardModule,
    ReactiveFormsModule,
    NbInputModule,
    NbButtonModule,
    NbAlertModule,
  ]
})
export class AuthenticationModule {
}
