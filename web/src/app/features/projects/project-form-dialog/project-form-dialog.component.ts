import {Component, Input, OnInit} from '@angular/core';
import {ParseProject} from '../state';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NbDialogRef} from '@nebular/theme';

@Component({
  selector: 'r-project-form-dialog',
  templateUrl: './project-form-dialog.component.html',
  styleUrls: ['./project-form-dialog.component.scss']
})
export class ProjectFormDialogComponent implements OnInit {

  isEdit = false;

  @Input() set project(project: ParseProject) {
    console.log('set project');
    if (project) {
      this.newProjectForm.patchValue(project.attributes);
      this.isEdit = true;
    }
  }

  newProjectForm!: FormGroup;

  constructor(
    private nbDialogRef: NbDialogRef<ProjectFormDialogComponent>,
    private fromBuilder: FormBuilder,
  ) {
    this.newProjectForm = this.fromBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  cancel(): void {
    this.nbDialogRef.close();
  }

  create(): void {
    if (this.newProjectForm.invalid) {
      return;
    }
    this.nbDialogRef.close(this.newProjectForm.value);
  }

  save(): void {
    if (this.newProjectForm.invalid || this.newProjectForm.pristine) {
      return;
    }
    this.nbDialogRef.close(this.newProjectForm.value);
  }

  get name(): FormControl {
    return this.newProjectForm.controls.name as FormControl;
  }

  get description(): FormControl {
    return this.newProjectForm.controls.description as FormControl;
  }


}
