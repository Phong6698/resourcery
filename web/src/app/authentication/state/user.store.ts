import {Injectable} from '@angular/core';
import {Store, StoreConfig} from '@datorama/akita';

export interface UserState {
  id: string;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  password?: string;
  updatedAt: Date;
  createdAt: Date;
  sessionToken: string;
}

export function createInitialState(): UserState {
  return {} as UserState;
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'user', resettable: true})
export class UserStore extends Store<UserState> {

  constructor() {
    super(createInitialState());
  }

}
