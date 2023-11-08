import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxPaginationModule } from 'ngx-pagination';

import { SharedModule } from 'src/app/shared/shared.module';
import { SenderComponent } from './sender/sender.component';
import { EmailComponent } from './email.component';
import { EmailRoutingModule } from './email-routing.module';
import { AddModalComponent } from './sender/add-modal/add-modal.component';
import { DeleteModalComponent } from './sender/delete-modal/delete-modal.component';

@NgModule({
  declarations: [
    SenderComponent,
    EmailComponent,
    AddModalComponent,
    DeleteModalComponent,
  ],
  imports: [
    CommonModule,
    EmailRoutingModule,
    NgxPaginationModule,
    SharedModule,
  ],
  exports:[
    EmailComponent
  ],
})
export class EmailModule { }