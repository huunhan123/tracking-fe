import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, from, mergeMap } from 'rxjs';

import { ParamsModel, ResponseModel } from 'src/app/feature/common.type';
import { EmailLinkRequestModel } from './link.model';
import { EmailLinkDto } from './link.dto';

@Injectable({
  providedIn: 'root'
})
export class EmailLinkDatasource {
  private prefix = '/api/email/link';
  private readonly chunkSize = 1024 * 10;

  constructor(private http: HttpClient) { }

  getEmailLink(params: ParamsModel): Observable<ResponseModel<EmailLinkDto[]>> {
    return this.http.get<ResponseModel<EmailLinkDto[]>>(`${this.prefix}`, {params: params.toHttpParams()});
  }

  addEmailLink(configure: EmailLinkRequestModel[]): Observable<void> {
    const chunks = [];
    for (let i = 0; i < configure.length; i += this.chunkSize) {
      const chunk = configure.slice(i, i + this.chunkSize);
      chunks.push(chunk);
    }

    return from(chunks).pipe(
      mergeMap(chunk => this.http.post<void>(`${this.prefix}/add`, chunk))
    );
  }

  deleteEmailLink(id: string): Observable<void> {
    return this.http.delete<void>(`${this.prefix}/delete/${id}`);
  }
}
