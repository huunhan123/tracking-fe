import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, from, mergeMap } from 'rxjs';

import { ParamsModel, ResponseModel } from 'src/app/feature/common.type';
import { EmailSenderRequestModel } from './sender.model';
import { EmailSenderDto } from './sender.dto';

@Injectable({
  providedIn: 'root'
})
export class EmailSenderDatasource {
  private prefix = '/api/email/sender';
  private readonly chunkSize = 1024 * 10;

  constructor(private http: HttpClient) { }

  getEmailSender(params: ParamsModel): Observable<ResponseModel<EmailSenderDto[]>> {
    return this.http.get<ResponseModel<EmailSenderDto[]>>(`${this.prefix}`, {params: params.toHttpParams()});
  }

  addEmailSender(configure: EmailSenderRequestModel[]): Observable<void> {
    const chunks = [];
    for (let i = 0; i < configure.length; i += this.chunkSize) {
      const chunk = configure.slice(i, i + this.chunkSize);
      chunks.push(chunk);
    }

    return from(chunks).pipe(
      mergeMap(chunk => this.http.post<void>(`${this.prefix}/add`, chunk))
    );
  }

  deleteEmailSender(id: string): Observable<void> {
    return this.http.delete<void>(`${this.prefix}/delete/${id}`);
  }
}
