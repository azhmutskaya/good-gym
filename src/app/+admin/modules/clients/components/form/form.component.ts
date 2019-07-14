import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  formIsVisible = false;

  constructor() { }

  ngOnInit() {
  }

  showForm(): void {
    this.formIsVisible = true;
  }

  hideForm(): void {
    this.formIsVisible = false;
  }

}
