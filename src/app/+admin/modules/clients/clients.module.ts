import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsComponent } from './clients.component';
import { SearchComponent } from './components/search/search.component';
import { FiltersComponent } from './components/filters/filters.component';
import { ListComponent } from './components/list/list.component';
import { FormComponent } from './components/form/form.component';


@NgModule({
  declarations: [ClientsComponent, SearchComponent, FiltersComponent, ListComponent, FormComponent],
  imports: [
    CommonModule
  ]
})
export class ClientsModule { }
