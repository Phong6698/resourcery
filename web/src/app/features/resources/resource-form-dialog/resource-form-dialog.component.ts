import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Resource, ResourceType} from '../state';

@Component({
  selector: 'r-resource-form-dialog',
  templateUrl: './resource-form-dialog.component.html',
  styleUrls: ['./resource-form-dialog.component.scss']
})
export class ResourceFormDialogComponent implements OnInit {

  isEdit = false;

  @Input() set resource(resource: Resource) {
    console.log('set resource');
    if (resource) {
      this.newResourceForm.patchValue(resource);
      this.isEdit = true;
    }
  }

  newResourceForm!: FormGroup;

  constructor(
    private nbDialogRef: NbDialogRef<ResourceFormDialogComponent>,
    private fromBuilder: FormBuilder,
  ) {
    this.newResourceForm = this.fromBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      type: [ResourceType.PERSON, Validators.required],
    });
  }

  ngOnInit(): void {
  }

  cancel(): void {
    this.nbDialogRef.close();
  }

  create(): void {
    if (this.newResourceForm.invalid) {
      return;
    }
    this.nbDialogRef.close(this.newResourceForm.value);
  }

  save(): void {
    if (this.newResourceForm.invalid || this.newResourceForm.pristine) {
      return;
    }
    this.nbDialogRef.close(this.newResourceForm.value);
  }

  get firstname(): FormControl {
    return this.newResourceForm.controls.firstname as FormControl;
  }

  get lastname(): FormControl {
    return this.newResourceForm.controls.lastname as FormControl;
  }

  get type(): FormControl {
    return this.newResourceForm.controls.type as FormControl;
  }
}
