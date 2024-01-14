import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReportComponent } from './report.component';

const routers: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ReportComponent,
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routers)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}