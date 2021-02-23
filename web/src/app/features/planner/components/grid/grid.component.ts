import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'r-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  constructor() { }

  resources: any[] = [
    'Miro', 'Phong', 'Yves'
  ];

  months: any[] = [
    new Month('Jan', 1, new Array(31)),
    new Month('Feb', 2, new Array(31)),
    new Month('Mar', 3, new Array(31)),
    new Month('Apr', 4, new Array(31)),
    new Month('May', 5, new Array(31)),
    new Month('Jun', 6, new Array(31)),
    new Month('Jul', 7, new Array(31)),
    new Month('Aug', 8, new Array(31)),
    new Month('Sep', 9, new Array(31)),
    new Month('Oct', 10, new Array(31)),
    new Month('Nov', 11, new Array(31)),
    new Month('Dec', 12, new Array(31)),
  ];

  ngOnInit(): void {
  }

}

class Month {
  constructor(public name: string, public ident: number, public days: any[]) {
  }
}
