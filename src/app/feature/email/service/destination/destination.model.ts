import { EmailDestinationDto } from './destination.dto';

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