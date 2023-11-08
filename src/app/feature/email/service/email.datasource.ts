import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ParamsModel, ResponseModel } from '../../common.type';
import { EmailSenderDto } from './email.dto';
import { EmailSenderRequestModel } from './email.model';

@Injectable({
  providedIn: 'root'
})
export class EmailDatasource {
  private prefix = '/api/email/sender';

  constructor(private http: HttpClient) { }

  getEmailSender(params: ParamsModel): Observable<ResponseModel<EmailSenderDto[]>> {
    return this.http.get<ResponseModel<EmailSenderDto[]>>(`${this.prefix}`, {params: params.toHttpParams()});
  }

  addEmailSender(configure: EmailSenderRequestModel[]): Observable<void> {
    return this.http.post<void>(`${this.prefix}/add`, configure);
  }

  deleteEmailSender(id: string): Observable<void> {
    return this.http.delete<void>(`${this.prefix}/delete/${id}`);
  }
}
