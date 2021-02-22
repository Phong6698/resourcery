import {Component, OnInit} from '@angular/core';
import versions from 'src/_versions';
import {NbThemeService} from '@nebular/theme';
import * as Parse from 'parse';

@Component({
  selector: 'r-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  versions = versions;
  theme = 'dark';

  constructor(
    private nbThemeService: NbThemeService
  ) {
  }

  ngOnInit(): void {
    this.load().then();
  }

  async load(): Promise<any> {
    const query = new Parse.Query('Test');
    const subscription = await query.subscribe();
    subscription.on('open', res => {
      console.log('subscription opened', res);
    });
    subscription.on('create', res => {
      console.log(`todo ${res.id} created`);
    });
    subscription.on('enter', res => {
      console.log(`todo ${res.id} entered`);
    });

    query.findAll().then(console.log);
  }

  changeTheme($event: string): void {
    this.nbThemeService.changeTheme($event);
  }
}
