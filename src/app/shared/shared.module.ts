import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NoDataComponent } from './components/no-data/no-data.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    NoDataComponent,
    NotFoundComponent,
    TableComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    SpinnerComponent,
    NoDataComponent,
    NotFoundComponent,
  ],
})
export class SharedModule {}