import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconSpriteModule } from 'ng-svg-icon-sprite';

import { AdminRoutingModule } from './admin-routing.module';
import { ClientsModule } from './modules/+clients/clients.module';
import { SubscriptionsModule } from './modules/+subscriptions/subscriptions.module';
import { LoginModule } from './modules/+login/login.module';

import { AdminComponent } from './admin.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ClearnLayoutComponent } from './components/clearn-layout/clearn-layout.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { fakeBackendProvider } from './helpers/fake-backend';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from '../in-memory-data.service';

@NgModule({
  declarations: [AdminComponent, NavigationComponent, ClearnLayoutComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    IconSpriteModule,
    ClientsModule,
    SubscriptionsModule,
    LoginModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider
  ]
})
export class AdminModule {
}
