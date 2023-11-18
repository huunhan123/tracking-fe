import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmailComponent } from './email.component';
import { SenderComponent } from './sender/sender.component';
import { TemplateComponent } from './template/template.component';
import { DestinationComponent } from './destination/destination.component';
import { MailingComponent } from './mailing/mailing.component';

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
      {
        path: 'destination',
        component: DestinationComponent,
      },
      {
        path: 'mailing',
        component: MailingComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routers)],
  exports: [RouterModule],
})
export class EmailRoutingModule {}