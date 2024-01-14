import { Injectable } from '@angular/core';
import { Params } from '@angular/router';

import { Observable, map } from 'rxjs';

import { EmailSubjectModel, EmailSubjectRequestModel } from './subject.model';
import { EmailSubjectDatasource } from './subject.datasource';
import { ParamsModel, ResponseModel } from 'src/app/feature/common.type';

@Injectable({
  providedIn: 'root'
})
export class EmailSubjectRepository {
  constructor(private datasource: EmailSubjectDatasource) { }

  getEmailSubject(params: Params): Observable<ResponseModel<EmailSubjectModel[]>> {
    return this.datasource.getEmailSubject(new ParamsModel(params)).pipe(
      map((response) => {
        return {
          data: response.data ? response.data.map(dto => new EmailSubjectModel(dto)) : [],
          metadata: response.metadata ? response.metadata : { totalRows: 0 },
        };
      })
    );
  }

  addEmailSubject(configure: EmailSubjectRequestModel[]): Observable<void> {
    return this.datasource.addEmailSubject(configure);
  }

  deleteEmailSubject(id: string): Observable<void> {
    return this.datasource.deleteEmailSubject(id);
  }
}
