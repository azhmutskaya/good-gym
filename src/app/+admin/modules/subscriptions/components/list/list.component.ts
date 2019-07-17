import { Component, Input, OnInit } from '@angular/core';
import { animate, animateChild, query, stagger, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    trigger('items', [
      transition(':enter', [
        style({ transform: 'translateY(-40px)', opacity: 0 }),
        animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
          style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('list', [
      transition(':enter', [
        query('@items', stagger(100, animateChild()))
      ]),
    ])
  ]
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
