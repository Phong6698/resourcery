import {Component, OnInit} from '@angular/core';
import * as Parse from 'parse';

@Component({
  selector: 'r-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor() {
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

}
