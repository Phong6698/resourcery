import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Resource} from '../../models/resource.interface';
import {Booking} from '../../models/booking.intertace';
import * as interactLib from 'interactjs';

const interact: any = interactLib;

@Component({
  selector: 'r-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.scss']
})
export class PeriodComponent implements AfterViewInit {

  @Input()
  resource: Resource;

  @Input()
  days: number[];

  snapGrid: any[] = [];

  @ViewChild('self') self: ElementRef;

  constructor() {
  }

  public slotClicked(event: MouseEvent): void {

    console.log(event);
    // @ts-ignore
    const rect = event.target?.parentNode.getBoundingClientRect();
    console.log(rect);

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const booking: Booking = {left: x, top: 0};
    this.resource.bookings.push(booking);
  }

  ngAfterViewInit(): void {
    this.makeGrid();
  }

  private makeGrid(): void {
    [...this.self.nativeElement.children].map((el: Element) => {
      const rect = el.getBoundingClientRect();
      this.snapGrid.push(interact.snappers.grid({x: rect.left, y: 1}));
    });
  }

}
