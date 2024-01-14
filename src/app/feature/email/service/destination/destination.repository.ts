import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';

import { EmailDestinationDatasource } from './destination.datasource';
import { Params, ParamsModel, ResponseModel } from '../../../common.type';
import { EmailDestinationModel, EmailDestinationRequestModel } from './destination.model';

@Injectable({
  providedIn: 'root'
})
export class EmailDestinationRepository {
  constructor(private datasource: EmailDestinationDatasource) { }

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
