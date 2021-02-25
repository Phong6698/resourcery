import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, ViewChild} from '@angular/core';
import * as interactLib from 'interactjs';
import {Booking, createBooking} from '../../state';
import {Resource} from '../../../resources/state';

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

  componentReady = false;

  @ViewChild('self') self: ElementRef;

  constructor(private  cd: ChangeDetectorRef) {
  }

  public slotClicked(event: MouseEvent): void {

    console.log(event);
    // @ts-ignore
    const rect = event.target?.parentNode.getBoundingClientRect();
    console.log(rect);

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const booking: Booking = createBooking({left: x, top: 0});
    this.resource.bookings.push(booking);
  }

  ngAfterViewInit(): void {
    this.makeGrid();
    this.componentReady = true;
    this.cd.detectChanges();
  }

  private makeGrid(): void {
    [...this.self.nativeElement.children].map((el: any) => {
      const rect = el.getBoundingClientRect();
      this.snapGrid.push(interact.snappers.grid({x: rect.left, y: 1}));
    });
  }

}
