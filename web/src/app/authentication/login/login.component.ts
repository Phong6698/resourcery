import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../state';

@Component({
  selector: 'r-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  private createRegisterForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get username(): FormControl {
    return this.loginForm.controls.username as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.controls.password as FormControl;
  }

  async submit(): Promise<any> {
    if (this.loginForm.invalid) {
      return;
    }

    await this.userService.login(this.username.value, this.password.value);
  }

}
