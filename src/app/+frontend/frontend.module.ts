import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFullpageModule } from '@fullpage/angular-fullpage';
import { FrontendRoutingModule } from './frontend-routing.module';
import { IconSpriteModule } from 'ng-svg-icon-sprite';

import { FrontendComponent } from './frontend.component';
import { BannerComponent } from './components/banner/banner.component';
import { PromoComponent } from './components/promo/promo.component';
import { WorkoutComponent } from './components/workout/workout.component';
import { SliderComponent } from './components/slider/slider.component';
import { InteriorComponent } from './components/interior/interior.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    FrontendComponent,
    BannerComponent,
    PromoComponent,
    WorkoutComponent,
    SliderComponent,
    InteriorComponent,
    ContactsComponent,
    SignUpComponent,
    FooterComponent
  ],
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
