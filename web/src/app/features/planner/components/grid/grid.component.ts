import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Resource} from '../../../resources/state';
import {AddBooking} from '../../interfaces/add-booking.interface';
import {ScheduleColumn} from '../../state/schedule/schedule-column.interface';

@Component({
  selector: 'r-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  @Input()
  resources: Resource[];

  @Input()
  schedule: ScheduleColumn[];

  @Output()
  createBooking = new EventEmitter<AddBooking>();

  days = new Array(31);
  bookings: { left, top }[] = [];

  constructor() {
  }

  ngOnInit(): void {

  }

  onCreate(event: AddBooking): void {
    this.createBooking.emit(event);
  }

}

