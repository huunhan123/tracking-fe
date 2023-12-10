import { ReportDto } from "./report.dto";

export class ReportModel {
  id: string;
  user: string;
  product: string;
  sender: string;
  template: string;
  sendAt: Date;

  constructor(dto: ReportDto) {
    this.id = dto.id;
    this.user = dto.user;
    this.product = dto.product;
    this.sender = dto.sender;
    this.template = dto.template;
    this.sendAt = new Date(Number(dto.sendAt));
  }
}