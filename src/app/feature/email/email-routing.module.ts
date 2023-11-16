import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmailComponent } from './email.component';
import { SenderComponent } from './sender/sender.component';
import { TemplateComponent } from './template/template.component';

const routers: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: EmailComponent,
      },
      {
        path: 'sender',
        component: SenderComponent,
      },
      {
        path: 'template',
        component: TemplateComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routers)],
  exports: [RouterModule],
})
export class EmailRoutingModule {}