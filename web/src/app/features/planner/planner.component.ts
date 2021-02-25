import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {NbDialogService} from '@nebular/theme';
import {PeriodFormDialogComponent} from './components/period-form-dialog/period-form-dialog.component';

@Component({
  selector: 'r-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlannerComponent implements OnInit, OnDestroy {

  subscription = new Subscription();

  constructor(private nbDialogService: NbDialogService) {
  }

  ngOnInit(): void {
  }

  createBooking(event): void {
    const windowSub = this.nbDialogService.open(PeriodFormDialogComponent).onClose
      .subscribe(console.log);

    this.subscription.add(windowSub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
