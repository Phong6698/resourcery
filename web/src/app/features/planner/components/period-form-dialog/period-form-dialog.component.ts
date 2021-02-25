import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {Booking} from '../../state';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ResourceType} from '../../../resources/state';

@Component({
  templateUrl: './period-form-dialog.component.html',
  styleUrls: ['./period-form.dialog.component.scss']
})
export class PeriodFormDialogComponent implements OnInit {

  isEdit = false;

  constructor(private nbDialogRef: NbDialogRef<PeriodFormDialogComponent>, private fb: FormBuilder) {
  }

  @Input() set booking(booking: Booking) {
    console.log('set booking');
    if (booking) {
      this.form.patchValue(booking);
      this.isEdit = true;
    }
  }

  form!: FormGroup;

  ngOnInit(): void {

    this.form = this.fb.group({
      hours: [null, Validators.required],
      daterange: [null, Validators.required]
    });
  }

  cancel(): void {
    this.nbDialogRef.close();
  }

  create(): void {
    if (this.form.invalid) {
      return;
    }

    console.log(this.form.value);
    // this.nbDialogRef.close(this.form.value);
  }

  save(): void {
    if (this.form.invalid || this.form.pristine) {
      return;
    }
    this.nbDialogRef.close(this.form.value);
  }


}
