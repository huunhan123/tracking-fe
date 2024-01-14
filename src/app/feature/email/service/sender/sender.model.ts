import { EmailSenderDto } from './sender.dto';

export class EmailSenderModel {
  id: string;
  email: string;
  password: string;
  tag: string;
  nextTime: number;

  constructor(dto: EmailSenderDto) {
    this.id = dto.id;
    this.email = dto.email;
    this.password = dto.password;
    this.tag = dto.tag;
    this.nextTime = dto.nextTime;
  }
}

export type EmailSenderRequestModel = {
  email: string,
  password: string,
  tag: string,
}