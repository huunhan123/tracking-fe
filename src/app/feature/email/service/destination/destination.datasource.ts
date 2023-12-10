import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, from, mergeMap } from 'rxjs';

import { ParamsModel, ResponseModel } from '../../../common.type';
import { EmailDestinationDto } from './destination.dto';
import { EmailDestinationRequestModel } from './destination.model';

@Injectable({
  providedIn: 'root'
})
export class EmailDestinationDatasource {
  private prefix = '/api/email/destination';
  private readonly chunkSize = 1024 * 10;

  constructor(private http: HttpClient) { }

  getEmailDestination(params: ParamsModel): Observable<ResponseModel<EmailDestinationDto[]>> {
    return this.http.get<ResponseModel<EmailDestinationDto[]>>(`${this.prefix}`, {params: params.toHttpParams()});
  }

  addEmailDestination(configure: EmailDestinationRequestModel[]): Observable<void> {
    const chunks = [];
    for (let i = 0; i < configure.length; i += this.chunkSize) {
      const chunk = configure.slice(i, i + this.chunkSize);
      chunks.push(chunk);
    }
    console.log(chunks);
    
    return from(chunks).pipe(
      mergeMap(chunk => this.http.post<void>(`${this.prefix}/add`, chunk))
    );
  }

  deleteEmailDestination(id: string): Observable<void> {
    return this.http.delete<void>(`${this.prefix}/delete/${id}`);
  }
}
