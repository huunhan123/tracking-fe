import { EmailLinkDto } from './link.dto';

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