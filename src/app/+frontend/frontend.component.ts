import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-frontend',
  templateUrl: './frontend.component.html',
  styleUrls: ['./frontend.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FrontendComponent implements OnInit {

  @ViewChild('cursor', {static: true}) cursor: ElementRef;
  @ViewChild('waves', {static: true}) waves: ElementRef;
  @ViewChild('nav', {static: true}) nav: ElementRef;

  config: any;
  fullpageApi: any;
  navIsOpen = false;

  SEPARATION = 100;
  AMOUNTX = 100;
  AMOUNTY = 70;

  camera;
  scene;
  renderer;

  particles;
  particle;
  count = 0;

  mouseX = 85;
  mouseY = -342;

  constructor() {

  }

  getRef(fullPageRef) {
    this.fullpageApi = fullPageRef;
  }

  ngOnInit() {
    this.config = {
      anchors: ['home', 'about', 'workout', 'plans', 'interior', 'contacts', 'sign-up', 'copyright'],
      lazyLoading: false,
      slidesNavigation: true,
      responsiveHeight: 420,
      touchSensitivity: 17,
      afterLoad: (origin, destination) => {
        destination.item.classList.add('is-animated');
      },
      afterSlideLoad: (section, origin, destination) => {
        destination.item.classList.add('is-animated');
      }
    };

    this.wavesInit();


  }

  renderWanes() {
    const animate = () => {
      if (!this.navIsOpen) {
        return;
      }
      requestAnimationFrame(animate);
      this.wavesRender();

    };

    animate();
  }

  wavesInit() {

    this.camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.z = 1000;

    this.scene = new THREE.Scene();

    this.particles = new Array();

    const PI2 = Math.PI * 2;
    const material = new THREE.ParticleCanvasMaterial({

      color: 0x212121,
      program: (context) => {

        context.beginPath();
        context.arc(0, 0, .6, 0, PI2, true);
        context.fill();

      }

    });

    let i = 0;

    for (let ix = 0; ix < this.AMOUNTX; ix++) {

      for (let iy = 0; iy < this.AMOUNTY; iy++) {

        this.particle = this.particles[i++] = new THREE.Particle(material);
        this.particle.position.x = ix * this.SEPARATION - ((this.AMOUNTX * this.SEPARATION) / 2);
        this.particle.position.z = iy * this.SEPARATION - ((this.AMOUNTY * this.SEPARATION) / 2);
        this.scene.add(this.particle);

      }

    }

    this.renderer = new THREE.CanvasRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.waves.nativeElement.appendChild(this.renderer.domElement);

  }

  wavesRender() {

    this.camera.position.x += (this.mouseX - this.camera.position.x) * .05;
    this.camera.position.y += (-this.mouseY - this.camera.position.y) * .05;
    this.camera.lookAt(this.scene.position);

    let i = 0;

    for (let ix = 0; ix < this.AMOUNTX; ix++) {

      for (let iy = 0; iy < this.AMOUNTY; iy++) {

        this.particle = this.particles[i++];
        this.particle.position.y = (Math.sin((ix + this.count) * 0.3) * 50) + (Math.sin((iy + this.count) * 0.5) * 50);
        this.particle.scale.x = this.particle.scale.y =
          (Math.sin((ix + this.count) * 0.3) + 1) * 2 + (Math.sin((iy + this.count) * 0.5) + 1) * 2;

      }

    }

    this.renderer.render(this.scene, this.camera);

    this.count += 0.1;

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
