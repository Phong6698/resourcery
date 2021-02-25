import {Component, OnInit} from '@angular/core';
import {Resource} from '../../models/resource.interface';

@Component({
  selector: 'r-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  days = new Array(31);
  bookings: { left, top }[] = [];
  resources: Resource[] = [
    {name: 'Miro', bookings: []},
    {name: 'Phong', bookings: []},
    {name: 'Yves', bookings: []},
  ];

  constructor() {
  }

  ngOnInit(): void {

  }

}

