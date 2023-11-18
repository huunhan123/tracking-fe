import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EmailRepository } from '../service/email.repository';
import { EmailTemplateModel, SendEmailRequestModel } from '../service/email.model';
import { Params } from '../../common.type';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-mailing',
  templateUrl: './mailing.component.html',
  styleUrls: ['./mailing.component.css']
})
export class MailingComponent implements OnInit {
  modalForm = this.formBuilder.nonNullable.group({
    template: ['', Validators.required],
    subject: ['', Validators.required],
  });

  params!: Params;
  templates!: EmailTemplateModel[] | undefined;

  constructor(
    private route: ActivatedRoute, 
    private repository: EmailRepository,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.initParams();
    this.getEmailTemplate();
  }

  sendMail() {
    this.modalForm.markAllAsTouched();

    if (this.modalForm.valid) {
      const sendMailConfigure: SendEmailRequestModel = {
        templateName: this.modalForm.value['template'],
        subject: this.modalForm.value['subject'],
      } 
     
      this.repository.sendEmail(sendMailConfigure).subscribe(() => {
        alert(`Send mail with template ${this.modalForm.value['template']} successfully`);
      });
    }
    this.modalForm.reset();
  }

  private getEmailTemplate(): void {
    this.templates = undefined;

    this.repository.getEmailTemplate(this.params).subscribe(
      { 
        next: data => {
          this.templates = [];

          data.data?.forEach(element => {
            this.templates!.push(element);
          });
        },

        error: () => {
          this.templates = [];
        }
      }
    );
  }

  private initParams(): void {
    this.params = {
      // orderType: SortState.ASC,
      // orderField: 'node',
      rpp: 100,
      page: 1,
      search: undefined,
    };
  }
}
