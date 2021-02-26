import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Booking} from '../../state/booking.model';
import * as moment from 'moment';

@Component({
  templateUrl: './period-form-dialog.component.html',
  styleUrls: ['./period-form.dialog.component.scss']
})
export class PeriodFormDialogComponent implements OnInit {

  isEdit = false;
  form!: FormGroup;


  @Input() set source(source: moment.Moment){
    if (source){
      this.form.patchValue({daterange: {start: source}});
    }
  }

  @Input() set booking(booking: Booking) {
    if (booking) {
      this.form.patchValue(booking);
      this.isEdit = true;
    }
  }

  constructor(private nbDialogRef: NbDialogRef<PeriodFormDialogComponent>, private fb: FormBuilder) {
    this.form = this.fb.group({
      hours: [moment().set({hour: 8, minute: 0}), Validators.required],
      daterange: [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  cancel(): void {
    this.nbDialogRef.close();
  }

  create(): void {
    if (this.form.invalid) {
      return;
    }

    this.nbDialogRef.close(this.form.value);
  }

  save(): void {
    if (this.form.invalid || this.form.pristine) {
      return;
    }
    this.nbDialogRef.close(this.form.value);
  }


}
