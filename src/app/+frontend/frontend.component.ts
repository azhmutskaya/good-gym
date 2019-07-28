import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-frontend',
  templateUrl: './frontend.component.html',
  styleUrls: ['./frontend.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FrontendComponent implements OnInit {

  @ViewChild('cursor', {static: true}) cursor: ElementRef;
  @ViewChild('waves', {static: true}) waves: ElementRef;

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
      anchors: ['home', 'about', 'workout', 'plans', 'interior', 'contacts', 'sign-up', 'copyright'],
      lazyLoading: false,
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

  cursorMove($event) {
    this.cursor.nativeElement.setAttribute('style', 'top: ' + ($event.pageY - 10) + 'px; left: ' + ($event.pageX - 10) + 'px;');
  }

  cursorClick() {
    this.cursor.nativeElement.classList.add('is-expand');

    setTimeout(() => {
      this.cursor.nativeElement.classList.remove('is-expand');
    }, 500);
  }
}
