import {
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbListModule,
  NbMenuModule,
  NbSelectModule,
  NbThemeModule,
  NbTimepickerModule,
  NbUserModule,
} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {NgModule} from '@angular/core';
import {NbMomentDateModule} from '@nebular/moment';

@NgModule({
  declarations: [],
  imports: [
    NbThemeModule.forRoot({name: 'dark'}),
    NbLayoutModule,
    NbEvaIconsModule,
    NbSelectModule,
    NbButtonModule,
    NbMenuModule.forRoot(),
    NbTimepickerModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbMomentDateModule
  ],
  exports: [
    NbThemeModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbSelectModule,
    NbButtonModule,
    NbMenuModule,
    NbCardModule,
    NbListModule,
    NbUserModule,
    NbIconModule,
    NbInputModule,
    NbTimepickerModule,
    NbDatepickerModule,
    NbMomentDateModule
  ]
})
export class NebularModule {
}

