import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatNativeDateModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { ReactiveFormsModule } from '@angular/forms';
import { IconSpriteModule } from 'ng-svg-icon-sprite';
import { NgxMaskModule } from 'ngx-mask';

import { ClientsComponent } from './clients.component';
import { SearchComponent } from './components/search/search.component';
import { FiltersComponent } from './components/filters/filters.component';
import { ListComponent } from './components/list/list.component';
import { FormComponent } from './components/form/form.component';
import { FilterPipe } from './pipes/filter.pipe';

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
