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

  @Output()
  createBooking = new EventEmitter<any>();

  snapGrid: any[] = [];

  componentReady = false;

  @ViewChild('self') self: ElementRef;

  constructor(private  cd: ChangeDetectorRef) {
  }

  public slotClicked(event: MouseEvent): void {
    // @ts-ignore
    const rect = event.target?.parentNode.getBoundingClientRect();
    console.log(rect);

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.createBooking.emit({x, y});
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
