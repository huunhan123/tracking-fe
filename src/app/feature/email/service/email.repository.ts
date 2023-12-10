import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { EmailDatasource } from './email.datasource';
import { SendEmailRequestModel } from './email.model';

@Injectable({
  providedIn: 'root'
})
export class EmailRepository {
  constructor(private datasource: EmailDatasource) { }

  sendEmail(): Observable<void> {
    return this.datasource.sendEmail();
  }
}
