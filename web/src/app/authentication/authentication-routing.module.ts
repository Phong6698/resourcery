import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {RegisterGuard} from './guard/register.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [RegisterGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [RegisterGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule {
}
