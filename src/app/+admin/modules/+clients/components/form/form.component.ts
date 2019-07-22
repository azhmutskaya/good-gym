import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';

import { Clients } from '../../interfaces/clients';
import { ClientsService } from '../../services/clients.service';

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

export class FormComponent implements OnInit, OnDestroy {
  @Input() clients;
  @Input() subscriptions;
  @Input() subscriptionsName;
  @Input() errors;

  @ViewChild('pageBottom', {static: true}) pageBottom: ElementRef;
  @ViewChild('formElement', {static: true}) formElement: ElementRef;

  todayDate = new Date(Date.now());
  minDate = new Date(this.todayDate.getFullYear() - 100, 0, 1);
  maxDate = new Date(this.todayDate.getFullYear() + 100, 0, 1);

  formIsVisible = false;
  isNewClient = true;
  currentClient: Clients;

  private expirationDateSubscription;
  private editClientSubscription;
  private isSubmitted = false;

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

  constructor(
    private fb: FormBuilder,
    private clientsService: ClientsService
  ) {
  }

  get phones() {
    return this.clientForm.get('phones') as FormArray;
  }

  ngOnInit() {
    this.validateExpirationDate();
    this.editCurrentClient();
    this.formIsVisible = false;
  }

  ngOnDestroy() {
    this.expirationDateSubscription.unsubscribe();
    this.editClientSubscription.unsubscribe();
  }

  createNewClient(): void {
    this.formIsVisible = true;
    this.isNewClient = true;
    this.resetForm();
  }

  hideForm(): void {
    this.formIsVisible = false;
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
    } else {
      this.formElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
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

  private editCurrentClient(): void {
    this.editClientSubscription = this.clientsService.currentClient.subscribe(currentClient => {
      this.formIsVisible = !!currentClient;
      this.isNewClient = false;

      this.currentClient = currentClient;

      if (this.currentClient) {
        this.clientForm.patchValue({
          firstName: this.currentClient.firstName,
          lastName: this.currentClient.lastName,
          isActive: this.currentClient.isActive,
          gender: this.currentClient.gender,
          dateOfBirth: this.currentClient.dateOfBirth,
          email: this.currentClient.email,
          address: this.currentClient.address,
          subscriptionId: this.currentClient.subscriptionId,
          expirationDate: this.currentClient.expirationDate,
        });

        this.currentClient.phones.forEach((value, index) => {
          if (index) {
            this.addPhone();
          }
        });

        this.phones.patchValue(this.currentClient.phones);
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

    this.pageBottom.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  private updateClient(currentClient: Clients): void {
    this.currentClient.subscriptionName = currentClient.subscriptionId ? this.subscriptionsName[currentClient.subscriptionId] : null;
    Object.assign(this.currentClient, currentClient);
  }

}
