import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';

import { Clients } from '../../interfaces/clients';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})

export class FormComponent implements OnInit {
  @Input() clients;
  @Input() subscriptions;
  @Input() subscriptionsName;
  @Input() errors;

  formIsVisible = false;
  todayDate = new Date(Date.now());
  minDate = new Date(this.todayDate.getFullYear() - 100, 0, 1);
  maxDate = new Date(this.todayDate.getFullYear() + 100, 0, 1);

  private isSubmitted = false;

  clientForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    isActive: [''],
    gender: ['male', Validators.required],
    dateOfBirth: [''],
    email: ['', Validators.email],
    phones: this.fb.array([
      this.fb.control('', Validators.pattern('\\+?([0-9])( ?)\\(?([0-9]{3})\\)?([ ]?)([0-9]{3})([ -]?)([0-9]{4})'))
    ]),
    address: [''],
    subscriptionId: [''],
    expirationDate: [{ value: '', disabled: true }]
  });

  dateOfBirthFilter = (date: Date): boolean => {
    return Date.now() > date.valueOf();
  }

  expirationDateFilter = (date: Date): boolean => {
    return Date.now() < date.valueOf();
  }

  constructor(
    private fb: FormBuilder
  ) {
  }

  get phones() {
    return this.clientForm.get('phones') as FormArray;
  }

  ngOnInit() {
    this.validateExpirationDate();
  }

  showForm(): void {
    this.formIsVisible = true;
  }

  hideForm(): void {
    this.formIsVisible = false;
    this.isSubmitted = false;
  }

  addPhone(): void {
    this.phones.push(this.fb.control('', Validators.pattern('\\+?([0-9])( ?)\\(?([0-9]{3})\\)?([ ]?)([0-9]{3})([ -]?)([0-9]{4})')));
  }

  removePhone(index: number): void {
    this.phones.removeAt(index);
  }

  trimField([key, index]: [string, number?]): void {
    const control = (index !== undefined)
      ? this.clientForm.get(key).get(`${index}`)
      : this.clientForm.get(key);

    if (typeof control.value !== 'object' ) {
      control.setValue(control.value.trim());
    }
  }

  isFilled([key, index]: [string, number?]): boolean {
    const control = (index !== undefined)
      ? this.clientForm.get(key).get(`${index}`)
      : this.clientForm.get(key);

    return (typeof control.value !== 'object') || control.value.trim();
  }

  hasError([key, index]: [string, number?]): boolean {
    const control = (index !== undefined)
      ? this.clientForm.get(key).get(`${index}`)
      : this.clientForm.get(key);

    return control.errors && (control.dirty || control.touched || this.isSubmitted);
  }

  errorMessages([key, index]: [string, number?], name: string): string[] {
    const control = (index !== undefined)
      ? this.clientForm.get(key).get(`${index}`)
      : this.clientForm.get(key);
    const errorMessages: string[] = [];

    if (control.errors.required) {
      errorMessages.push(`${name} is required.`);
    }
    if (control.errors.email
      || control.errors.pattern
      || control.errors.matDatepickerParse
      || control.errors.matDatepickerMin
      || control.errors.matDatepickerMax) {
      errorMessages.push(`${name} isn't correct.`);
    }
    return errorMessages;
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.clientForm.valid) {
      this.addNewClient(this.clientForm.getRawValue());
      this.hideForm();
    } else {
      console.log(1);
    }
  }

  private validateExpirationDate(): void {
    this.clientForm.get('subscriptionId').valueChanges.subscribe(val => {
      const expirationDate = this.clientForm.get('expirationDate');
      if (val) {
        expirationDate.setValidators([Validators.required]);
        expirationDate.updateValueAndValidity();
        expirationDate.enable();
      } else {
        expirationDate.clearValidators();
        expirationDate.updateValueAndValidity();
        expirationDate.disable();
      }
    });
  }

  private addNewClient(newClient: Clients): void {
    newClient.id = btoa(Math.random().toString()).substring(0, 24);
    newClient.balance = 0;
    newClient.subscriptionName = this.subscriptionsName[newClient.subscriptionId];

    this.clients.push(newClient);

    setTimeout(() => {
      document.getElementById(newClient.id).scrollIntoView({ behavior: 'smooth' });
    }, 0);


  }
}
