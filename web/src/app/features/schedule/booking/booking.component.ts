import {ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnInit} from '@angular/core';
import interact from 'interactjs';
import {ScheduleBooking} from '../shared/schedule-booking.model';
import {ParseBooking} from '../shared/state';

@Component({
  selector: 'r-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingComponent implements OnInit {

  @HostBinding('style.width') width;
  @HostBinding('style.left') left;
  @HostBinding('style.top') top;

  booking: ParseBooking;

  @Input() set scheduleBooking(scheduleBooking: ScheduleBooking) {
    const {booking, schedulePosition} = scheduleBooking;
    this.booking = booking;
    this.width = (schedulePosition.dateEndIndex - schedulePosition.dateStartIndex + 1) * 50 + 'px';
    this.left = schedulePosition.dateStartIndex * 50 + 'px';
    this.top = schedulePosition.resourceIndex * 50 + 'px';
  }

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.initInteract();
  }

  private initInteract(): void {
    interact(this.elementRef.nativeElement)
      .draggable({
        modifiers: [
          interact.modifiers.snapSize({
            targets: [
              interact.snappers.grid({width: 50, height: 50})
            ],
          }),
          interact.modifiers.restrictRect({
            restriction: 'parent'
          })
        ],
        inertia: true,
        listeners: {
          move: (event) => {
            event.target.style.left = event.target.offsetLeft + event.dx + 'px';
            event.target.style.top = event.target.offsetTop + event.dy + 'px';
          }
        }
      })
      .resizable({
        edges: {right: true, left: true},
        modifiers: [
          interact.modifiers.snapSize({
            targets: [
              interact.snappers.grid({width: 50, height: 50})
            ],
          }),
          interact.modifiers.restrictRect({
            restriction: 'parent'
          }),
          interact.modifiers.restrictSize({
            min: {width: 50, height: 50},
          })
        ],
        listeners: {
          move: (event) => {
            event.target.style.width = event.rect.width + 'px';
            event.target.style.height = event.rect.height + 'px';
            if (event._interaction.edges.left) {
              event.target.style.left = event.target.offsetLeft + event.dx + 'px';
            }
          }
        },
        inertia: true
      });
  }

}
