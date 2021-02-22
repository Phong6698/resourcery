import { Component } from '@angular/core';
import versions from 'src/_versions';

@Component({
  selector: 'r-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'resourcery';
  versions = versions;
}
