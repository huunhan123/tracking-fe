import { EmailSubjectDto } from './subject.dto';

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
  subject: string,
  greeting: boolean,
  tag: string,
}