import {AfterViewInit, Directive, ElementRef, Input, Renderer2} from '@angular/core';
import * as interactLib from 'interactjs';
import * as moment from 'moment';
import {Booking} from '../state/booking.model';
import {DateFormat} from '../../../shared/types/date.type';

const interact: any = interactLib;

@Directive({
  selector: '[rBooking]',
})
export class BookingDirective implements AfterViewInit {

  @Input()
  public booking: Booking;

  @Input()
  period: HTMLDivElement;

  @Input()
  grid: any[];

  constructor(private renderer: Renderer2, private self: ElementRef) {
  }

  public ngAfterViewInit(): void {
    const {left, width} = this.resolvePosition();

    this.renderer.setStyle(this.self.nativeElement, 'width', width + 'px');
    this.renderer.setStyle(this.self.nativeElement, 'left', left + 'px');
    this.renderer.setStyle(this.self.nativeElement, 'top', 10 + 'px');
    this.initInteract();
  }

  private initInteract(): void {
    interact(this.self.nativeElement)
      .resizable({
        inertia: false,
        edges: {left: true, right: true, bottom: false, top: false},
        listeners: {
          move(event): void {
            const target = event.target;
            let x = (parseFloat(target.getAttribute('data-x')) || 0);
            let y = (parseFloat(target.getAttribute('data-y')) || 0);

            // update the element's style
            target.style.width = event.rect.width + 'px';
            target.style.height = event.rect.height + 'px';

            // translate when resizing from top or left edges
            x += event.deltaRect.left;
            y += event.deltaRect.top;

            target.style.webkitTransform = target.style.transform =
              'translate(' + x + 'px,' + y + 'px)';

            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
            target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height);
          }
        },
        modifiers: [
          interact.modifiers.restrictEdges({
            outer: 'parent'
          }),
          interact.modifiers.snapEdges({
            targets: this.grid,
            range: Infinity,
          }),
        ],

      })
      .draggable({
        listeners: {move: this.dragMoveListener},
        modifiers: [
          interact.modifiers.snapEdges({
            targets: this.grid,
            range: Infinity,
          }),
          interact.modifiers.restrictRect({
            restriction: 'parent'
          })
        ],
        inertia: false,
      });
  }

  private dragMoveListener(event: any): void {
    const target = event.target;
      // keep the dragged position in the data-x/data-y attributes
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
      target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }


  private resolvePosition(): { left, width } {
    const momentFrom = moment(this.booking.from, DateFormat);
    const momentTo = moment(this.booking.to, DateFormat);
    const reference = moment(`${1}.${1}.${momentFrom.year()}`, DateFormat);

    const diffFrom = momentFrom.diff(reference, 'days');
    const diffTo = momentTo.diff(reference, 'days') + 1;

    const left = 44 * (diffFrom);
    const width = (44 * diffTo) - left;

    return {left, width};

  }

}
