import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { ClearnLayoutComponent } from './components/clearn-layout/clearn-layout.component';

import { AuthGuard } from './helpers/auth.guard';

const adminRoutes: Routes = [
  {
    path: 'login', component: ClearnLayoutComponent, children: [
      {path: '', loadChildren: () => import('./modules/+login/login.module').then(m => m.LoginModule)}
    ]
  },
  {
    path: '', component: AdminComponent, children: [
      {
        path: '',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/+clients/clients.module').then(m => m.ClientsModule)
      },
      {
        path: 'subscriptions',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/+subscriptions/subscriptions.module').then(m => m.SubscriptionsModule)
      },
    ]
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})

export class AdminRoutingModule {
}
