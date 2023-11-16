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

@NgModule({
  declarations: [
    EmailComponent,
    SenderComponent,
    AddSenderModalComponent,
    DeleteSenderModalComponent,
    TemplateComponent,
    AddTemplateModalComponent,
    DeleteTemplateModalComponent,
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