import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../state';

@Component({
  selector: 'r-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
  }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  private createRegisterForm(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get email(): FormControl {
    return this.registerForm.controls.email as FormControl;
  }

  get username(): FormControl {
    return this.registerForm.controls.username as FormControl;
  }

  get firstname(): FormControl {
    return this.registerForm.controls.firstname as FormControl;
  }

  get lastname(): FormControl {
    return this.registerForm.controls.lastname as FormControl;
  }

  get password(): FormControl {
    return this.registerForm.controls.password as FormControl;
  }

  async submit(): Promise<any> {
    if (this.registerForm.invalid) {
      return;
    }

    await this.userService.register(this.registerForm.value);
  }
}
