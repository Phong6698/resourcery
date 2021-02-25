import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Resource, ResourceQuery} from '../../../resources/state';
import {Observable} from 'rxjs';

@Component({
  selector: 'r-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  @Output()
  createBooking = new EventEmitter<any>();

  days = new Array(31);
  bookings: { left, top }[] = [];
  resources$: Observable<Resource[]> = this.resourceQuery.getWithBookings();
  constructor(private resourceQuery: ResourceQuery) {
  }

  ngOnInit(): void {

  }

  onCreate(event): void{
    this.createBooking.emit(event)
  }

}

