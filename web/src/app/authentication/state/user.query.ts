import {Injectable} from '@angular/core';
import {Query} from '@datorama/akita';
import {UserState, UserStore} from './user.store';

@Injectable({providedIn: 'root'})
export class UserQuery extends Query<UserState> {

  user$ = this.select();
  isLoggedIn$ = this.select(state => !!state.sessionToken);
  username$ = this.select('username');

  constructor(protected store: UserStore) {
    super(store);
  }

}
