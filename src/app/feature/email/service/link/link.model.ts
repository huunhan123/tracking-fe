import { EmailLinkDto } from './link.dto';

export class EmailLinkModel {
  id: string;
  info: string;
  link: string;
  tag: string;

  constructor(dto: EmailLinkDto) {
    this.id = dto.id;
    this.info = dto.info;
    this.link = dto.link;
    this.tag = dto.tag;
  }
}

export type EmailLinkRequestModel = {
  info: string,
  link: string,
  tag: string,
}