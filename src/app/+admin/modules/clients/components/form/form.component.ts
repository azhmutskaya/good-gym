import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';


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
      this.fb.control('')
    ]),
    address: [''],
    subscriptionId: [''],
    expirationDate: ['']
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

  isFilled(field: string, index: number): boolean {
    return index === undefined
      ? !!this.clientForm.value[field].trim()
      : !!this.clientForm.value[field][index].trim();
  }

  addPhone(): void {
    this.phones.push(this.fb.control(''));
  }

  removePhone(index: number): void {
    this.phones.removeAt(index);
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.clientForm);
  }

}
