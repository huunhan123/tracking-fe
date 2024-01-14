import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SearchComponent } from 'src/app/shared/components/search/search.component';
import { ConfigPage, Params } from '../../common.type';
import { EmailTemplateModel, EmailTemplateRequestModel } from '../service/template/template.model';
import { EmailTemplateRepository } from '../service/template/template.repository';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {
  @ViewChild('search') private search!: SearchComponent;

  params!: Params;
  templates!: EmailTemplateModel[] | undefined;
  configPage!: ConfigPage;

  showAddTemplateModal = false;
  showDeleteTemplateModal = false;

  deleteTemplateID!: string;

  constructor(
    private route: ActivatedRoute, 
    private repository: EmailTemplateRepository,
  ) {}

  ngOnInit(): void {
    this.initParams();

    this.getEmailTemplate();
  }

  onSearch(event: string): void {
    this.params.search = event;
    this.params.page = 1;
    
    this.getEmailTemplate();
  }

  refresh(): void {
    this.initParams();
    this.search.clearSearch();

    this.getEmailTemplate();
  }

  pageChanged(event: number): void {
    this.params.page = event;
    this.configPage.currentPage = event;

    this.getEmailTemplate();
  }

  openAddTemplateModal(): void {
    this.showAddTemplateModal = true;
  }

  confirmAddTemplate(emailTemplateRequestModel: EmailTemplateRequestModel): void {
    this.showAddTemplateModal = false;

    this.repository.addEmailTemplate(emailTemplateRequestModel).subscribe(() => {
      this.getEmailTemplate();
    });
  }

  openDeleteTemplateModal(id: string): void {
    this.showDeleteTemplateModal = true;

    this.deleteTemplateID = id;
  }

  confirmDeleteTemplate(id: string): void {
    this.showDeleteTemplateModal = false;

    this.repository.deleteEmailTemplate(id).subscribe(() => {
      this.getEmailTemplate();
    });
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

          this.configPage.totalItems = data.metadata!.totalRows;;
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

    this.configPage = {
      currentPage: this.params.page,
      itemsPerPage: this.params.rpp,
    }
  }
}
