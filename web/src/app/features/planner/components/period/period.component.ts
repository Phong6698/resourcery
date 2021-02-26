import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import * as interactLib from 'interactjs';
import {Resource} from '../../../resources/state';
import {AddBooking} from '../../interfaces/add-booking.interface';
import {ScheduleColumn} from '../../state/schedule/schedule-column.interface';
import * as moment from 'moment';

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

  @Input()
  schedule: ScheduleColumn[];

  @Output()
  createBooking = new EventEmitter<AddBooking>();

  snapGrid: any[] = [];

  componentReady = false;

  @ViewChild('self') self: ElementRef;

  constructor(private  cd: ChangeDetectorRef) {
  }

  public slotClicked(event: MouseEvent): void {
    // @ts-ignore
    const momentObj = moment(event.target?.dataset.date, 'DD.MM.YYYY');

    this.createBooking.emit({source: momentObj, resource: this.resource});
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
