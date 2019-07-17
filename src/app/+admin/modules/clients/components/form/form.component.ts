import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';

import { Clients } from '../../interfaces/clients';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Observable } from 'rxjs';

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

export class FormComponent implements OnInit, OnDestroy {
  @Input() clients;
  @Input() subscriptions;
  @Input() subscriptionsName;
  @Input() errors;
  @Input() currentClient;
  @Input() editClient: Observable<void>;

  todayDate = new Date(Date.now());
  minDate = new Date(this.todayDate.getFullYear() - 100, 0, 1);
  maxDate = new Date(this.todayDate.getFullYear() + 100, 0, 1);

  private expirationDateSubscription: any;
  private editClientSubscription: any;

  private isSubmitted = false;

  formIsVisible = false;
  isNewClient = true;

  clientBlank = this.currentClient !== undefined ? this.currentClient : {
    isActive: '',
    gender: 'male',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    phones: [''],
    address: '',
    subscriptionId: '',
    expirationDate: ''
  };

  temp = {
    isActive: '',
    gender: 'male',
    firstName: this.currentClient !== undefined ? this.currentClient.firstName : '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    phones: [''],
    address: '',
    subscriptionId: '',
    expirationDate: ''
  };

  clientForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    isActive: [false],
    gender: ['male', Validators.required],
    dateOfBirth: [''],
    email: ['', Validators.email],
    phones: this.fb.array([
      this.fb.control('', Validators.pattern('\\+?([0-9])( ?)\\(?([0-9]{3})\\)?([ ]?)([0-9]{3})([ -]?)([0-9]{4})'))
    ]),
    address: [''],
    subscriptionId: [null],
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
    this.editClientSubscription = this.editClient.subscribe(() => {
      this.isNewClient = false;
      this.formIsVisible = true;
      console.log('edit');
      console.log(this.temp.firstName);
      setTimeout(() => {
        console.log('edit timeout');
        console.log(this.temp.firstName);
        console.log(this.currentClient);
        this.clientForm.patchValue({
          firstName: this.currentClient.firstName,
          lastName: this.currentClient.lastName,
        });
      }, 500);
    });
  }

  ngOnDestroy() {
    this.expirationDateSubscription.unsubscribe();
  }

  createNewClient(): void {
    this.formIsVisible = true;
    this.isNewClient = true;
    this.currentClient = this.clientBlank;
    console.log('new');
    console.log(this.temp.firstName);
    console.log(this.currentClient);
  }

  hideForm(): void {
    //console.log(this.currentClient);
    //console.log(this.clientForm);
    this.formIsVisible = false;
    this.isSubmitted = false;
    this.isNewClient = false;
    this.currentClient = null;
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

    if (typeof control.value !== 'object') {
      control.setValue(control.value.trim());
    }
  }

  isFilled([key, index]: [string, number?]): boolean {
    const control = (index !== undefined)
      ? this.clientForm.get(key).get(`${index}`)
      : this.clientForm.get(key);

    return (typeof control.value !== 'object') && control.value.trim();
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
      this.isNewClient
        ? this.addNewClient(this.clientForm.getRawValue())
        : this.updateClient(this.clientForm.getRawValue());
      this.hideForm();
      this.resetForm();
    }
  }

  private validateExpirationDate(): void {
    this.expirationDateSubscription = this.clientForm.get('subscriptionId').valueChanges.subscribe(val => {
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

  private resetForm(): void {
    this.isSubmitted = false;

    this.clientForm.reset();

    this.clientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      isActive: [false],
      gender: ['male', Validators.required],
      dateOfBirth: [''],
      email: ['', Validators.email],
      phones: this.fb.array([
        this.fb.control('', Validators.pattern('\\+?([0-9])( ?)\\(?([0-9]{3})\\)?([ ]?)([0-9]{3})([ -]?)([0-9]{4})'))
      ]),
      address: [''],
      subscriptionId: [null],
      expirationDate: [{ value: '', disabled: true }]
    });

    this.validateExpirationDate();

  }

  private addNewClient(newClient: Clients): void {
    newClient.id = btoa(Math.random().toString()).substring(0, 24);
    newClient.balance = 0;
    newClient.subscriptionName = newClient.subscriptionId ? this.subscriptionsName[newClient.subscriptionId] : null;

    this.clients.push(newClient);

    // crutch
    setTimeout(() => {
      document.getElementById(newClient.id).scrollIntoView({ behavior: 'smooth' });
    }, 500);
  }

  private updateClient(newClient: Clients): void {
    console.log(this.currentClient.id);
    this.clientForm.patchValue({
      firstName: this.currentClient.firstName,
      lastName: this.currentClient.lastName,
    });
  }

}
