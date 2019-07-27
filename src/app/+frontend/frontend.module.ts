import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontendComponent } from './frontend.component';
import { FrontendRoutingModule } from './frontend-routing.module';
import { AngularFullpageModule } from '@fullpage/angular-fullpage';
import { IconSpriteModule } from 'ng-svg-icon-sprite';

@NgModule({
  declarations: [FrontendComponent],
  imports: [
    CommonModule,
    FrontendRoutingModule,
    AngularFullpageModule,
    IconSpriteModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class FrontendModule {
}
