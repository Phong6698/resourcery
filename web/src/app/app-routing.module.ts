import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AuthenticationGuard} from './authentication/guard/authentication.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'planner',
    loadChildren: () => import('./features/planner/planner.module').then(m => m.PlannerModule),
    canLoad: [AuthenticationGuard]
  },
  {
    path: 'resources',
    loadChildren: () => import('./features/resources/resources.module').then(m => m.ResourcesModule),
    canLoad: [AuthenticationGuard]
  },
  {
    path: 'projects',
    loadChildren: () => import('./features/projects/projects.module').then(m => m.ProjectsModule),
    canLoad: [AuthenticationGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
