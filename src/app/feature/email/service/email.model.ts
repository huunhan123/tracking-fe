import { EmailDestinationDto, EmailLinkDto, EmailSenderDto, EmailSubjectDto, EmailTemplateDto } from './email.dto';

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

export class EmailTemplateModel {
  id: string;
  name: string;
  url: string;
  tag: string;

  constructor(dto: EmailTemplateDto) {
    this.id = dto.id;
    this.name = dto.name;
    this.url = dto.url;
    this.tag = dto.tag;
  }
}

export type EmailTemplateRequestModel = {
  name: string,
  content: string,
  tag: string,
}

export class EmailDestinationModel {
  id: string;
  name: string;
  email: string;
  tag: string;

  constructor(dto: EmailDestinationDto) {
    this.id = dto.id;
    this.name = dto.name;
    this.email = dto.email;
    this.tag = dto.tag;
  }
}

export type EmailDestinationRequestModel = {
  name: string,
  email: string,
  tag: string,
}

export class EmailLinkModel {
  id: string;
  link: string;
  tag: string;

  constructor(dto: EmailLinkDto) {
    this.id = dto.id;
    this.link = dto.link;
    this.tag = dto.tag;
  }
}

export type EmailLinkRequestModel = {
  link: string,
  tag: string,
}

export class EmailSubjectModel {
  id: string;
  subject: string;
  greeting: boolean;
  tag: string;

  constructor(dto: EmailSubjectDto) {
    this.id = dto.id;
    this.subject = dto.subject;
    this.greeting = dto.greeting;
    this.tag = dto.tag;
  }
}

export type EmailSubjectRequestModel = {
  link: string,
  tag: string,
}

export type SendEmailRequestModel = {
  templateName?: string,
  subject?: string,
}