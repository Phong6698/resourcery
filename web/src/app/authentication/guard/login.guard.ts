import {Injectable} from '@angular/core';
import {CanActivate, CanLoad, Router, UrlTree} from '@angular/router';
import {UserStore} from '../state';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanLoad, CanActivate {

  constructor(
    public router: Router,
    private userStore: UserStore
  ) {}

  canLoad(): boolean | UrlTree {
    return this.userStore.getValue().sessionToken ? this.router.parseUrl('/home') : true;
  }

  canActivate(): boolean | UrlTree {
    return this.userStore.getValue().sessionToken ? this.router.parseUrl('/home') : true;
  }

}
