import { Injectable } from '@angular/core';

import { EmailDatasource } from './email.datasource';
import { Params, ParamsModel, ResponseModel } from '../../common.type';
import { Observable, map } from 'rxjs';
import { EmailDestinationModel, EmailDestinationRequestModel, EmailSenderModel, EmailSenderRequestModel, EmailTemplateModel, EmailTemplateRequestModel } from './email.model';

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

  getEmailTemplate(params: Params): Observable<ResponseModel<EmailTemplateModel[]>> {
    return this.datasource.getEmailTemplate(new ParamsModel(params)).pipe(
      map((response) => {
        return {
          data: response.data ? response.data.map(dto => new EmailTemplateModel(dto)) : [],
          metadata: response.metadata ? response.metadata : { totalRows: 0 },
        };
      })
    );
  }

  addEmailTemplate(configure: EmailTemplateRequestModel): Observable<void> {
    return this.datasource.addEmailTemplate(configure);
  }

  deleteEmailTemplate(id: string): Observable<void> {
    return this.datasource.deleteEmailTemplate(id);
  }

  getEmailDestination(params: Params): Observable<ResponseModel<EmailDestinationModel[]>> {
    return this.datasource.getEmailDestination(new ParamsModel(params)).pipe(
      map((response) => {
        return {
          data: response.data ? response.data.map(dto => new EmailDestinationModel(dto)) : [],
          metadata: response.metadata ? response.metadata : { totalRows: 0 },
        };
      })
    );
  }

  addEmailDestination(configure: EmailDestinationRequestModel[]): Observable<void> {
    return this.datasource.addEmailDestination(configure);
  }

  deleteEmailDestination(id: string): Observable<void> {
    return this.datasource.deleteEmailDestination(id);
  }
}
