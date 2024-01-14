import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';

import { SharedModule } from 'src/app/shared/shared.module';
import { SenderComponent } from './sender/sender.component';
import { EmailComponent } from './email.component';
import { EmailRoutingModule } from './email-routing.module';
import { AddSenderModalComponent } from './sender/add-modal/add-modal.component';
import { DeleteSenderModalComponent } from './sender/delete-modal/delete-modal.component';
import { TemplateComponent } from './template/template.component';
import { AddTemplateModalComponent } from './template/add-modal/add-modal.component';
import { DeleteTemplateModalComponent } from './template/delete-modal/delete-modal.component';
import { DestinationComponent } from './destination/destination.component';
import { DeleteDestinationModalComponent } from './destination/delete-modal/delete-modal.component';
import { AddDestinationModalComponent } from './destination/add-modal/add-modal.component';
import { MailingComponent } from './mailing/mailing.component';
import { LinkComponent } from './link/link.component';
import { AddLinkModalComponent } from './link/add-modal/add-modal.component';
import { DeleteLinkModalComponent } from './link/delete-modal/delete-modal.component';
import { SubjectComponent } from './subject/sucject.component';
import { AddSubjectModalComponent } from './subject/add-modal/add-modal.component';
import { DeleteSubjectModalComponent } from './subject/delete-modal/delete-modal.component';

@NgModule({
  declarations: [
    EmailComponent,
    SenderComponent,
    AddSenderModalComponent,
    DeleteSenderModalComponent,
    TemplateComponent,
    AddTemplateModalComponent,
    DeleteTemplateModalComponent,
    DestinationComponent,
    AddDestinationModalComponent,
    DeleteDestinationModalComponent,
    MailingComponent,
    LinkComponent,
    AddLinkModalComponent,
    DeleteLinkModalComponent,
    SubjectComponent,
    AddSubjectModalComponent,
    DeleteSubjectModalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmailRoutingModule,
    NgxPaginationModule,
    SharedModule,
  ],
  exports:[
    EmailComponent
  ],
})
export class EmailModule { }