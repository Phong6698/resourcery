import {Injectable} from '@angular/core';
import {CanActivate, CanLoad, Router, UrlTree} from '@angular/router';
import {UserStore} from '../state';


@Injectable({
  providedIn: 'root'
})
export class RegisterGuard implements CanLoad, CanActivate {

  constructor(
    public router: Router,
    private userStore: UserStore
  ) {}

  canLoad(): boolean | UrlTree {
    return this.userStore.getValue().sessionToken ? this.router.parseUrl('/auth/login') : true;
  }

  canActivate(): boolean | UrlTree {
    return this.userStore.getValue().sessionToken ? this.router.parseUrl('/auth/login') : true;
  }

}
