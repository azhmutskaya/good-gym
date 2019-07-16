import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() subscriptions;
  @Input() errors;

  sortKey = '';
  sortType = true;

  constructor() {
  }

  ngOnInit() {
  }

  sortSubscriptions(key): void {
    this.sortType = this.sortKey !== key
      ? true
      : !this.sortType;

    this.sortKey = key;

    this.subscriptions.sort((a, b) => {
      return this.sortType
        ? +(a[key] > b[key]) || -1
        : +(a[key] < b[key]) || -1;
    });
  }

}
