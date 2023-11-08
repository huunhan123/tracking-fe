import { Injectable } from '@angular/core';

import { EmailDatasource } from './email.datasource';
import { Params, ParamsModel, ResponseModel } from '../../common.type';
import { Observable, map } from 'rxjs';
import { EmailSenderModel, EmailSenderRequestModel } from './email.model';

@Injectable({
  providedIn: 'root'
})
export class EmailRepository {
  constructor(private datasource: EmailDatasource) { }

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
