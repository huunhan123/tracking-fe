import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NoDataComponent } from './components/no-data/no-data.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TableComponent } from './components/table/table.component';
import { TableTemplate } from './components/table/table-template.directive';
import { CommonComponent } from './components/common/common.component';
import { CommonHeaderComponent } from './components/common/common-header/common-header.component';
import { SearchComponent } from './components/search/search.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    NoDataComponent,
    NotFoundComponent,
    TableComponent,
    TableTemplate,
    CommonComponent,
    CommonHeaderComponent,
    SearchComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule,
  ],
  exports: [
    SpinnerComponent,
    NoDataComponent,
    NotFoundComponent,
    TableComponent,
    TableTemplate,
    CommonComponent,
    SearchComponent,
    ModalComponent,
  ],
})
export class SharedModule {}