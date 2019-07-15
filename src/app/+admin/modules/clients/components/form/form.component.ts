import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {
  formIsVisible = false;

  foods: any = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  clientForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    isActive: [''],
    gender: ['male', Validators.required],
    dateOfBirth: [''],
    email: ['', Validators.email],
    phones: this.fb.array([
      this.fb.control('', Validators.pattern('\\(?([0-9]{3})\\)?([ .-]?)([0-9]{3})\\2([0-9]{2})([ .-]?)([0-9]{2})'))
    ]),
    address: [''],
    subscriptionId: [''],
    expirationDate: ['', Validators.required]
  });

  get phones() {
    return this.clientForm.get('phones') as FormArray;
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
  }

  showForm(): void {
    this.formIsVisible = true;
  }

  hideForm(): void {
    this.formIsVisible = false;
  }

  addPhone(): void {
    this.phones.push(this.fb.control(''));
  }

  removePhone(index: number): void {
    this.phones.removeAt(index);
  }

  isFilled([key, index]: [string, number?]): boolean {
    return index === undefined
      ? !!this.clientForm.controls[key].value.trim()
      : !!this[key].controls[index].value.trim();
  }

  hasError([key, index]: [string, number?]): boolean {
    if (index !== undefined) {
      return this[key].controls[index].errors
        && (this[key].controls[index].dirty
          || this[key].controls[index].touched);
    }
    return this.clientForm.controls[key].errors
      && (this.clientForm.controls[key].dirty
        || this.clientForm.controls[key].touched);
  }

  errorMessages(key: string, name: string): [string] {

    return ['dfdf'];
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.clientForm);
  }

}
