import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Config } from '../config/config';

@Injectable()
export class HostHttpInterceptor implements HttpInterceptor {
  constructor(private config: Config) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const fullURL = `${this.config.backendProtocol}://${this.config.backendHost}:${this.config.backendPort}${req.url}`;
    
    const updatedRequest = req.clone({url: fullURL});

    return next.handle(updatedRequest); 
  }
}