import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      
      {
        path: 'email',
        loadChildren: () => import('src/app/feature/email/email.module').then(m => m.EmailModule),
      },

      {
        path: 'report',
        loadChildren: () => import('src/app/feature/report/report.module').then(m => m.ReportModule),
      },

      {
        path: '**',
        loadChildren: () => import('../../../feature/page-not-found/page-not-found.module').then((m) => m.PageNotFoundModule),
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}