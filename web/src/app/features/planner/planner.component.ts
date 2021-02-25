import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'r-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlannerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
