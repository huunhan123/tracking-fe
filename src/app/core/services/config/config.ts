import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Config {
  backendProtocol = environment.backend.protocol;
  backendHost = environment.backend.host;
  backendPort = environment.backend.port;
}