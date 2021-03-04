import {Component, OnInit} from '@angular/core';
import {NbMenuItem, NbThemeService} from '@nebular/theme';
import versions from '../../../../_versions';
import {UserQuery} from '../../../authentication/state';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'r-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  versions = versions;
  theme = 'dark';
  dedicated = false;

  items$!: Observable<NbMenuItem[]>;

  loggedInItems: NbMenuItem[] = [
    {title: 'Dashboard', link: '/home'},
    {title: 'Schedule', link: '/schedule'},
    {title: 'Minions', link: '/resources'},
    {title: 'Projects', link: '/projects'},
  ];

  loggedOutItems: NbMenuItem[] = [
    {title: 'Login', link: '/auth/login'},
    {title: 'Register', link: '/auth/register'}
  ];

  constructor(
    private nbThemeService: NbThemeService,
    public userQuery: UserQuery
  ) {
  }

  ngOnInit(): void {
    this.items$ = this.userQuery.isLoggedIn$.pipe(
      map( isLoggedIn => isLoggedIn ? this.loggedInItems : this.loggedOutItems),
      startWith([])
    );

  }

  changeTheme($event: string): void {
    this.nbThemeService.changeTheme($event);
  }

}
