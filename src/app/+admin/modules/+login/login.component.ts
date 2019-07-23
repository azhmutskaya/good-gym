import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  passwordIsVisible = false;

  error = false;

  loginForm = this.fb.group({
    userName: [null, Validators.required],
    password: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {

  }

  trimField([key, index]: [string, number?]): void {
    const control = (index !== undefined)
      ? this.loginForm.get(key).get(`${index}`)
      : this.loginForm.get(key);

    if (typeof control.value !== 'object') {
      control.setValue(control.value.trim());
    }
  }

  isFilled([key, index]: [string, number?]): boolean {
    const control = (index !== undefined)
      ? this.loginForm.get(key).get(`${index}`)
      : this.loginForm.get(key);

    return (typeof control.value !== 'object') && control.value.trim();
  }


  onSubmit() {
    if (this.loginForm.valid) {
      if (this.loginForm.get('userName').value  === 'Admin' && this.loginForm.get('password').value === 'Admin') { // facepalm
        console.log('login');
        this.error = false;
      } else {
        this.error = true;
      }
    }
  }

  togglePassword($password) {
    this.passwordIsVisible = !this.passwordIsVisible;
    if (this.passwordIsVisible) {
      $password.setAttribute('type', 'text');
    } else {
      $password.setAttribute('type', 'password');
    }
  }

}
