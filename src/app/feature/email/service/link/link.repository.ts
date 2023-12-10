import { Injectable } from '@angular/core';
import { Params } from '@angular/router';

import { Observable, map } from 'rxjs';

import { EmailLinkModel, EmailLinkRequestModel } from './link.model';
import { EmailLinkDatasource } from './link.datasource';
import { ParamsModel, ResponseModel } from 'src/app/feature/common.type';

@Injectable({
  providedIn: 'root'
})
export class EmailLinkRepository {
  constructor(private datasource: EmailLinkDatasource) { }

  getEmailLink(params: Params): Observable<ResponseModel<EmailLinkModel[]>> {
    return this.datasource.getEmailLink(new ParamsModel(params)).pipe(
      map((response) => {
        return {
          data: response.data ? response.data.map(dto => new EmailLinkModel(dto)) : [],
          metadata: response.metadata ? response.metadata : { totalRows: 0 },
        };
      })
    );
  }

  addEmailLink(configure: EmailLinkRequestModel[]): Observable<void> {
    return this.datasource.addEmailLink(configure);
  }

  deleteEmailLink(id: string): Observable<void> {
    return this.datasource.deleteEmailLink(id);
  }
}
