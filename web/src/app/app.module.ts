import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from './core/core.module';
import {AkitaNgDevtools} from '@datorama/akita-ngdevtools';
import {AkitaNgRouterStoreModule} from '@datorama/akita-ng-router-store';
import {environment} from '../environments/environment';
import {HomeComponent} from './home/home.component';
import {SharedModule} from './shared/shared.module';
import {NbDialogModule} from '@nebular/theme';
import {UserService} from './authentication/state';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    AkitaNgRouterStoreModule,
    NbDialogModule.forChild()
  ],
  providers: [
    // {provide: ErrorHandler, useClass: SentryService},
    {
      provide: APP_INITIALIZER,
      useFactory: userContextProviderFactory,
      deps: [UserService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function userContextProviderFactory(userService: UserService): () => void {
  return () => userService.loadUser();
}
