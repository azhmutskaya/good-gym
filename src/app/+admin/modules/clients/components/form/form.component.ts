import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
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

  private clientForm = this.fb.group({
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
    expirationDate: ['']
  });

  dateOfBirthFilter = (date: Date): boolean => {
    return Date.now() > date.valueOf();
  };

  expirationDateFilter = (date: Date): boolean => {
    return Date.now() < date.valueOf();
  };

  get phones() {
    return this.clientForm.get('phones') as FormArray;
  }

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.validateExpirationDate();
  }

  private showForm(): void {
    this.formIsVisible = true;
  }

  private hideForm(): void {
    this.formIsVisible = false;
    this.isSubmitted = false;
  }

  private addPhone(): void {
    this.phones.push(this.fb.control('', Validators.pattern('\\+?([0-9])( ?)\\(?([0-9]{3})\\)?([ ]?)([0-9]{3})([ -]?)([0-9]{4})')));
  }

  private removePhone(index: number): void {
    this.phones.removeAt(index);
  }

  private trimField([key, index]: [string, number?]): void {
    const control = (index !== undefined)
      ? this[key].controls[index]
      : this.clientForm.controls[key];

    if (control.value !== null) {
      control.setValue(control.value.trim());
    }
  }

  private validateExpirationDate(): void {
    this.clientForm.get('subscriptionId').valueChanges.subscribe(val => {
      if (val) {
        this.clientForm.controls.expirationDate.setValidators([Validators.required]);
        this.clientForm.controls.expirationDate.updateValueAndValidity();
      } else {
        this.clientForm.controls.expirationDate.clearValidators();
        this.clientForm.controls.expirationDate.updateValueAndValidity();
      }
    });
  }

  private isFilled([key, index]: [string, number?]): boolean {
    const control = (index !== undefined)
      ? this[key].controls[index]
      : this.clientForm.controls[key];

    return (control.value === null) || control.value.trim();
  }

  private hasError([key, index]: [string, number?]): boolean {
    const control = (index !== undefined)
      ? this[key].controls[index]
      : this.clientForm.controls[key];

    return control.errors && (control.dirty || control.touched || this.isSubmitted);
  }

  private errorMessages([key, index]: [string, number?], name: string): string[] {
    const control = (index !== undefined)
      ? this[key].controls[index]
      : this.clientForm.controls[key];
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

  private onSubmit() {
    this.isSubmitted = true;

    console.log(this.clientForm);
  }
}
