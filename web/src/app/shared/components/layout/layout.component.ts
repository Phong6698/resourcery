import {Component, OnInit} from '@angular/core';
import {NbMenuItem, NbThemeService} from '@nebular/theme';
import versions from '../../../../_versions';

@Component({
  selector: 'r-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  versions = versions;
  theme = 'dark';

  items: NbMenuItem[] = [
    {title: 'Dashboard', link: '/home'},
    {title: 'Planner', link: '/planner'},
    {title: 'Minions', link: '/resources'},
    {title: 'Projects'},
  ];
  constructor(
    private nbThemeService: NbThemeService
  ) {
  }

  ngOnInit(): void {
  }

  changeTheme($event: string): void {
    this.nbThemeService.changeTheme($event);
  }

}
