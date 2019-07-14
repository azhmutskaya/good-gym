import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontendComponent } from './frontend.component';
import { FrontendRoutingModule } from './frontend-routing.module';

@NgModule({
  declarations: [FrontendComponent],
  imports: [
    CommonModule,
    FrontendRoutingModule
  ]
})
export class FrontendModule {
}
