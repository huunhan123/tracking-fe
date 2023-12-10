import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SendEmailRequestModel } from './email.model';

@Injectable({
  providedIn: 'root'
})
export class EmailDatasource {
  private prefix = '/api/email';
  private readonly chunkSize = 1024 * 10;

  constructor(private http: HttpClient) { }

  sendEmail(configure: SendEmailRequestModel): Observable<void> {
    return this.http.post<void>(`${this.prefix}/send-email`, configure);
  }
}
