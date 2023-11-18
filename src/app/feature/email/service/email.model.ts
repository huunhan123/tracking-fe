import { EmailDestinationDto, EmailSenderDto, EmailTemplateDto } from './email.dto';

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

export class EmailTemplateModel {
  id: string;
  name: string;
  url: string;

  constructor(dto: EmailTemplateDto) {
    this.id = dto.id;
    this.name = dto.name;
    this.url = dto.url;
  }
}

export type EmailTemplateRequestModel = {
  name: string,
  content: string,
}

export class EmailDestinationModel {
  id: string;
  name: string;
  email: string;

  constructor(dto: EmailDestinationDto) {
    this.id = dto.id;
    this.name = dto.name;
    this.email = dto.email;
  }
}

export type EmailDestinationRequestModel = {
  name: string,
  email: string,
}

export type SendEmailRequestModel = {
  templateName?: string,
  subject?: string,
}