import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients.component';

const clientsRoutes: Routes = [
  {
    path: '', component: ClientsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(clientsRoutes)],
  exports: [RouterModule]
})

export class ClientsRoutingModule {
}
