import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';

import { SharedModule } from 'src/app/shared/shared.module';
import { ReportComponent } from './report.component';
import { ReportRoutingModule } from './report-routing.module';

@NgModule({
  declarations: [
    ReportComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReportRoutingModule,
    NgxPaginationModule,
    SharedModule,
  ],
  exports:[
    ReportComponent
  ],
})
export class ReportModule { }