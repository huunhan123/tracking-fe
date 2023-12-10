import { Injectable } from '@angular/core';
import { Params } from '@angular/router';

import { Observable, map } from 'rxjs';

import { EmailSenderModel, EmailSenderRequestModel } from './sender.model';
import { EmailSenderDatasource } from './sender.datasource';
import { ParamsModel, ResponseModel } from 'src/app/feature/common.type';

@Injectable({
  providedIn: 'root'
})
export class EmailSenderRepository {
  constructor(private datasource: EmailSenderDatasource) { }

  getEmailSender(params: Params): Observable<ResponseModel<EmailSenderModel[]>> {
    return this.datasource.getEmailSender(new ParamsModel(params)).pipe(
      map((response) => {
        return {
          data: response.data ? response.data.map(dto => new EmailSenderModel(dto)) : [],
          metadata: response.metadata ? response.metadata : { totalRows: 0 },
        };
      })
    );
  }

  addEmailSender(configure: EmailSenderRequestModel[]): Observable<void> {
    return this.datasource.addEmailSender(configure);
  }

  deleteEmailSender(id: string): Observable<void> {
    return this.datasource.deleteEmailSender(id);
  }
}
