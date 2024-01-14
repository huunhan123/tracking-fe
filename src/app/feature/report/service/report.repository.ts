import { Injectable } from '@angular/core';

import { ReportDatasource } from './report.datasource';
import { Params, ParamsModel, ResponseModel } from '../../common.type';
import { Observable, map } from 'rxjs';
import { ReportModel } from './report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportRepository {
  constructor(private datasource: ReportDatasource) { }

  getReport(params: Params): Observable<ResponseModel<ReportModel[]>> {
    return this.datasource.getReport(new ParamsModel(params)).pipe(
      map((response) => {
        return {
          data: response.data ? response.data.map(dto => new ReportModel(dto)) : [],
          metadata: response.metadata ? response.metadata : { totalRows: 0 },
        };
      })
    );
  }

}