import {Component, OnInit} from '@angular/core';
import {UserQuery, UserService} from '../authentication/state';

@Component({
  selector: 'r-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user$ = this.userQuery.user$;
  username$ = this.userQuery.username$;

  constructor(
    private userService: UserService,
    private userQuery: UserQuery,
  ) {
  }

  ngOnInit(): void {

    // throw new Error('SENTRY TEST ERROR'); // TODO remove

  }

  async logout(): Promise<any> {
    await this.userService.logout();
  }
}
