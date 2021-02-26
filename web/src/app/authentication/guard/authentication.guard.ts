import {Injectable} from '@angular/core';
import {CanActivate, CanLoad, Router, UrlTree} from '@angular/router';
import {UserStore} from '../state';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanLoad, CanActivate {

  constructor(
    public router: Router,
    private userStore: UserStore,
  ) {}

  canLoad(): boolean | UrlTree {
    return this.userStore.getValue().sessionToken ? true : this.router.parseUrl('/auth/login');
  }

  canActivate(): boolean | UrlTree {
    return this.userStore.getValue().sessionToken ? true : this.router.parseUrl('/auth/login');
  }

}
