import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ParamsModel, ResponseModel } from '../../../common.type';
import { EmailTemplateDto } from './template.dto';
import { EmailTemplateRequestModel } from './template.model';

@Injectable({
  providedIn: 'root'
})
export class EmailTemplateDatasource {
  private prefix = '/api/email/template';
  private readonly chunkSize = 1024 * 10;

  constructor(private http: HttpClient) { }

  getEmailTemplate(params: ParamsModel): Observable<ResponseModel<EmailTemplateDto[]>> {
    return this.http.get<ResponseModel<EmailTemplateDto[]>>(`${this.prefix}`, {params: params.toHttpParams()});
  }

  addEmailTemplate(configure: EmailTemplateRequestModel): Observable<void> {
    return this.http.post<void>(`${this.prefix}/add`, {...configure});
  }

  deleteEmailTemplate(id: string): Observable<void> {
    return this.http.delete<void>(`${this.prefix}/delete/${id}`);
  }
}
