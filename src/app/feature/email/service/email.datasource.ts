import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, mergeMap } from 'rxjs';

import { ParamsModel, ResponseModel } from '../../common.type';
import { EmailDestinationDto, EmailSenderDto, EmailTemplateDto } from './email.dto';
import { EmailDestinationRequestModel, EmailSenderRequestModel, EmailTemplateRequestModel, SendEmailRequestModel } from './email.model';

@Injectable({
  providedIn: 'root'
})
export class EmailDatasource {
  private prefix = '/api/email';
  private readonly chunkSize = 1024 * 10;

  constructor(private http: HttpClient) { }

  getEmailSender(params: ParamsModel): Observable<ResponseModel<EmailSenderDto[]>> {
    return this.http.get<ResponseModel<EmailSenderDto[]>>(`${this.prefix}/sender`, {params: params.toHttpParams()});
  }

  addEmailSender(configure: EmailSenderRequestModel[]): Observable<void> {
    const chunks = [];
    for (let i = 0; i < configure.length; i += this.chunkSize) {
      const chunk = configure.slice(i, i + this.chunkSize);
      chunks.push(chunk);
    }

    return from(chunks).pipe(
      mergeMap(chunk => this.http.post<void>(`${this.prefix}/sender/add`, chunk))
    );
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

  getEmailDestination(params: ParamsModel): Observable<ResponseModel<EmailDestinationDto[]>> {
    return this.http.get<ResponseModel<EmailDestinationDto[]>>(`${this.prefix}/destination`, {params: params.toHttpParams()});
  }

  addEmailDestination(configure: EmailDestinationRequestModel[]): Observable<void> {
    const chunks = [];
    for (let i = 0; i < configure.length; i += this.chunkSize) {
      const chunk = configure.slice(i, i + this.chunkSize);
      chunks.push(chunk);
    }
    console.log(chunks);
    
    return from(chunks).pipe(
      mergeMap(chunk => this.http.post<void>(`${this.prefix}/destination/add`, chunk))
    );
  }

  deleteEmailDestination(id: string): Observable<void> {
    return this.http.delete<void>(`${this.prefix}/destination/delete/${id}`);
  }

  sendEmail(configure: SendEmailRequestModel): Observable<void> {
    return this.http.post<void>(`${this.prefix}/send-email`, configure);
  }
}
