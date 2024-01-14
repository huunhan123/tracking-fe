import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ParamsModel, ResponseModel } from '../../common.type';
import { ReportDto } from './report.dto';

@Injectable({
  providedIn: 'root'
})
export class ReportDatasource {
  private prefix = '/api/report';

  constructor(private http: HttpClient) { }

  getReport(params: ParamsModel): Observable<ResponseModel<ReportDto[]>> {
    return this.http.get<ResponseModel<ReportDto[]>>(`${this.prefix}`, {params: params.toHttpParams()});
  }

}