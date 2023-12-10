import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';

import { EmailTemplateDatasource } from './template.datasource';
import { Params, ParamsModel, ResponseModel } from '../../../common.type';
import { EmailTemplateModel, EmailTemplateRequestModel } from './template.model';

@Injectable({
  providedIn: 'root'
})
export class EmailTemplateRepository {
  constructor(private datasource: EmailTemplateDatasource) { }

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
}
