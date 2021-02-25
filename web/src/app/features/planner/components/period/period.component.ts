import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
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

  constructor(public renderer: Renderer2) { }

  public slotClicked(event: MouseEvent): void {

    console.log(event);

    // @ts-ignore
    const rect = event.target?.parentNode.getBoundingClientRect();
    console.log(rect);

    const d = this.renderer.createElement('div');

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    // debugger;

    const booking: Booking = {left: x, top: 0};
    this.resource.bookings.push(booking);
  }

  private makeGrid(): void{
    // const parent = this.self.nativeElement.parentNode;
    //
    // console.log(this.self.nativeElement.parentNode);
    [...this.self.nativeElement.children].map((el: Element) => {
      // @ts-ignore
      const rect = el.getBoundingClientRect();
      this.snapGrid.push(interact.snappers.grid({x: rect.left, y: 1}));
    });
    console.log(this.snapGrid);
  }

  ngAfterViewInit(): void {
    this.makeGrid();
  }

}
