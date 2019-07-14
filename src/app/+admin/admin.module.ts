import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconSpriteModule } from 'ng-svg-icon-sprite';

import { AdminComponent } from './admin.component';
import { NavigationComponent } from './components/navigation/navigation.component';

import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [AdminComponent, NavigationComponent],
  imports: [
    CommonModule,
    IconSpriteModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
