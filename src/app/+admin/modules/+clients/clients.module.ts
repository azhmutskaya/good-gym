import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';

import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatNativeDateModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { ReactiveFormsModule } from '@angular/forms';
import { IconSpriteModule } from 'ng-svg-icon-sprite';
import { NgxMaskModule } from 'ngx-mask';
import { FilterPipe } from './pipes/filter.pipe';

import { ClientsComponent } from './clients.component';
import { SearchComponent } from './components/search/search.component';
import { FiltersComponent } from './components/filters/filters.component';
import { ListComponent } from './components/list/list.component';
import { FormComponent } from './components/form/form.component';


@NgModule({
  declarations: [
    ClientsComponent,
    SearchComponent,
    FiltersComponent,
    ListComponent,
    FormComponent,
    FilterPipe,
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    SatDatepickerModule,
    SatNativeDateModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    IconSpriteModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot()
  ]
})
export class ClientsModule {
}
