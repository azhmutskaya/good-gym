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
    if (control.value !== null) {
      control.setValue(control.value.trim());
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

  isFilled([key, index]: [string, number?]): boolean {
    const control = (index !== undefined)
      ? this.clientForm.get(key).get(`${index}`)
      : this.clientForm.get(key);

    return (control.value === null) || control.value.trim();
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

    console.log(this.clientForm);
  }
}
