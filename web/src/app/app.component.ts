import { Component } from '@angular/core';
import versions from 'src/_versions';
import {NbThemeService} from '@nebular/theme';

@Component({
  selector: 'r-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  versions = versions;
  theme = 'dark';

  constructor(private nbThemeService: NbThemeService) {
  }

  changeTheme($event: string): void {
    this.nbThemeService.changeTheme($event);
  }
}
