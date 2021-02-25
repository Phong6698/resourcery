import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Resource, ResourceQuery} from '../../../resources/state';
import {Observable} from 'rxjs';
import {AddBooking} from '../../interfaces/add-booking.interface';

@Component({
  selector: 'r-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  @Output()
  createBooking = new EventEmitter<AddBooking>();

  days = new Array(31);
  bookings: { left, top }[] = [];
  resources$: Observable<Resource[]> = this.resourceQuery.getWithBookings();
  constructor(private resourceQuery: ResourceQuery) {
  }

  ngOnInit(): void {

  }

  onCreate(event: AddBooking): void{
    this.createBooking.emit(event);
  }

}

