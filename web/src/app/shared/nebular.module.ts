import {NbButtonModule, NbLayoutModule, NbMenuModule, NbSelectModule, NbThemeModule} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {NgModule} from '@angular/core';

@NgModule({
  declarations: [
  ],
  imports: [
    NbThemeModule.forRoot({name: 'dark'}),
    NbLayoutModule,
    NbEvaIconsModule,
    NbSelectModule,
    NbButtonModule,
    NbMenuModule.forRoot()
  ],
  exports: [
    NbThemeModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbSelectModule,
    NbButtonModule,
    NbMenuModule
  ]
})
export class NebularModule {
}

