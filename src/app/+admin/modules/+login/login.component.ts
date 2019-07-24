import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthenticationService } from '../../services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  passwordIsVisible = false;

  error = false;

  returnUrl: string;

  loginForm = this.fb.group({
    userName: [null, Validators.required],
    password: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/admin']);
    }
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
      console.log('login');
      this.error = false;
      this.authenticationService.login(this.loginForm.get('userName').value, this.loginForm.get('password').value)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate([this.returnUrl]);
          },
          error => {
            this.error = true;
          });
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
