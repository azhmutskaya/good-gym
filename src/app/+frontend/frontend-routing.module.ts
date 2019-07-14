import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FrontendComponent } from './frontend.component';


const frontendRoutes: Routes = [
  {
    path: '', component: FrontendComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(frontendRoutes)],
  exports: [RouterModule]
})

export class FrontendRoutingModule { }
