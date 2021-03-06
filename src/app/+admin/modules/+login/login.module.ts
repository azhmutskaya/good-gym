import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';

import { LoginComponent } from './login.component';
import { IconSpriteModule } from 'ng-svg-icon-sprite';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    IconSpriteModule,
    ReactiveFormsModule,
  ]
})
export class LoginModule {
}
