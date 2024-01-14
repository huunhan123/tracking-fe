import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, from, mergeMap } from 'rxjs';

import { ParamsModel, ResponseModel } from 'src/app/feature/common.type';
import { EmailSubjectRequestModel } from './subject.model';
import { EmailSubjectDto } from './subject.dto';

@Injectable({
  providedIn: 'root'
})
export class EmailSubjectDatasource {
  private prefix = '/api/email/subject';
  private readonly chunkSize = 1024 * 10;

  constructor(private http: HttpClient) { }

  getEmailSubject(params: ParamsModel): Observable<ResponseModel<EmailSubjectDto[]>> {
    return this.http.get<ResponseModel<EmailSubjectDto[]>>(`${this.prefix}`, {params: params.toHttpParams()});
  }

  addEmailSubject(configure: EmailSubjectRequestModel[]): Observable<void> {
    const chunks = [];
    for (let i = 0; i < configure.length; i += this.chunkSize) {
      const chunk = configure.slice(i, i + this.chunkSize);
      chunks.push(chunk);
    }

    return from(chunks).pipe(
      mergeMap(chunk => this.http.post<void>(`${this.prefix}/add`, chunk))
    );
  }

  deleteEmailSubject(id: string): Observable<void> {
    return this.http.delete<void>(`${this.prefix}/delete/${id}`);
  }
}
