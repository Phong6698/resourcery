import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {NbDialogService} from '@nebular/theme';
import {PeriodFormDialogComponent} from './components/period-form-dialog/period-form-dialog.component';
import {AddBooking} from './interfaces/add-booking.interface';
import * as moment from 'moment';
import {BookingService} from './state/booking.service';
import { createBooking } from './state/booking.model';
@Component({
  selector: 'r-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlannerComponent implements OnInit, OnDestroy {

  subscription = new Subscription();

  constructor(private nbDialogService: NbDialogService, private bookingService: BookingService) {
  }

  ngOnInit(): void {
  }

  createBooking(event: AddBooking): void {
    const dialogSub = this.nbDialogService.open(PeriodFormDialogComponent)
      .onClose
      .subscribe(values => {
        const booking = createBooking({
          from: moment(values.daterange.start).format('DD.MM.YYYY'),
          to: moment(values.daterange.end).format('DD.MM.YYYY')
        });

        this.bookingService.create(booking, event.resource);

      });
    this.subscription.add(dialogSub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
