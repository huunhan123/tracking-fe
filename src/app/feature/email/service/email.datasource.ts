import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ParamsModel, ResponseModel } from '../../common.type';
import { EmailSenderDto, EmailTemplateDto } from './email.dto';
import { EmailSenderRequestModel, EmailTemplateRequestModel } from './email.model';

@Injectable({
  providedIn: 'root'
})
export class EmailDatasource {
  private prefix = '/api/email';

  constructor(private http: HttpClient) { }

  getEmailSender(params: ParamsModel): Observable<ResponseModel<EmailSenderDto[]>> {
    return this.http.get<ResponseModel<EmailSenderDto[]>>(`${this.prefix}/sender`, {params: params.toHttpParams()});
  }

  addEmailSender(configure: EmailSenderRequestModel[]): Observable<void> {
    return this.http.post<void>(`${this.prefix}/sender/add`, configure);
  }

  deleteEmailSender(id: string): Observable<void> {
    return this.http.delete<void>(`${this.prefix}/sender/delete/${id}`);
  }

  getEmailTemplate(params: ParamsModel): Observable<ResponseModel<EmailTemplateDto[]>> {
    return this.http.get<ResponseModel<EmailTemplateDto[]>>(`${this.prefix}/template`, {params: params.toHttpParams()});
  }

  addEmailTemplate(configure: EmailTemplateRequestModel): Observable<void> {
    return this.http.post<void>(`${this.prefix}/template/add`, {...configure});
  }

  deleteEmailTemplate(id: string): Observable<void> {
    return this.http.delete<void>(`${this.prefix}/template/delete/${id}`);
  }
}
