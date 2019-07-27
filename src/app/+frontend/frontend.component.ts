import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-frontend',
  templateUrl: './frontend.component.html',
  styleUrls: ['./frontend.component.scss']
})
export class FrontendComponent implements OnInit {

  config: any;
  fullpageApi: any;

  constructor() {
  }

  getRef(fullPageRef) {
    this.fullpageApi = fullPageRef;
  }

  ngOnInit() {
    this.config = {
      //licenseKey: 'YOUR LICENSE KEY HERE',
      anchors: ['home', 'about', 'workout', 'plans', 'interior', 'contacts', 'map', 'sign-up', ''],
      lazyLoading: true,
      slidesNavigation: true,
      responsiveHeight: 420,
      //keyboardScrolling: false,
      touchSensitivity: 17,
      afterLoad: (origin, destination) => {
        destination.item.classList.add('is-animated');
      },
      afterSlideLoad: (section, origin, destination) => {
        destination.item.classList.add('is-animated');
      }
    };
  }

}
