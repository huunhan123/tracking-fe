import { EmailTemplateDto } from './template.dto';

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