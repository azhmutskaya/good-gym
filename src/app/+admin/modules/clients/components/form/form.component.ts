import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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

  clientForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    isActive: new FormControl(''),
    gender: new FormControl(''),
    dateOfBirth: new FormControl(''),
    email: new FormControl(''),
    phones: new FormControl(''),
    address: new FormControl(''),
    subscriptionId: new FormControl(''),
    expirationDate: new FormControl('')
  });

  constructor() {
  }

  ngOnInit() {
  }

  showForm(): void {
    this.formIsVisible = true;
  }

  hideForm(): void {
    this.formIsVisible = false;
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.clientForm.value);
  }

}
