import {Injectable} from '@angular/core';
import {UserState, UserStore} from './user.store';
import * as Parse from 'parse';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private userStore: UserStore, private router: Router) {
    this.loadUser();
  }

  async login(username: string, password: string): Promise<any> {
    this.userStore.setLoading(true);
    const user = await Parse.User.logIn(username, password);
    this.userStore.update(this.mapParseUserToUserState(user));
    this.userStore.setLoading(false);
    return this.router.navigate(['/']);
  }

  async logout(): Promise<any> {
    this.userStore.setLoading(true);
    await Parse.User.logOut();
    this.userStore.reset();
    this.userStore.setLoading(false);
    return this.router.navigate(['/auth', 'login']); // TODO remove tippfehler
  }

  async register(user: Partial<UserState>): Promise<any> {
    this.userStore.setLoading(true);
    const parseUser = new Parse.User();
    const registeredUser = await parseUser.signUp(user);
    this.userStore.update(this.mapParseUserToUserState(registeredUser));
    this.userStore.setLoading(false);
    return this.router.navigate(['/']);
  }

  loadUser(): void {
    this.userStore.setLoading(true);
    const user = Parse.User.current();
    if (user) {
      this.userStore.update(this.mapParseUserToUserState(user));
    }
    this.userStore.setLoading(false);
  }

  private mapParseUserToUserState(user: Parse.User): UserState {
    const {email, username, firstname, lastname, updatedAt, createdAt, sessionToken} = user.attributes;
    return {
      id: user.id,
      email,
      username,
      firstname,
      lastname,
      updatedAt,
      createdAt,
      sessionToken
    } as UserState;
  }

}
