import { EmailSenderDto } from './email.dto';

export class EmailSenderModel {
  id: string;
  email: string;
  password: string;

  constructor(dto: EmailSenderDto) {
    this.id = dto.id;
    this.email = dto.email;
    this.password = dto.password;
  }
}

export type EmailSenderRequestModel = {
  email: string,
  password: string,
}