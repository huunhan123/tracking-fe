import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SearchComponent } from 'src/app/shared/components/search/search.component';
import { ConfigPage, Params } from '../../common.type';
import { EmailSenderRepository } from '../service/sender/sender.repository';
import { EmailSenderModel, EmailSenderRequestModel } from '../service/sender/sender.model';

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.css']
})
export class SenderComponent implements OnInit {
  @ViewChild('search') private search!: SearchComponent;

  params!: Params;
  senders!: EmailSenderModel[] | undefined;
  configPage!: ConfigPage;

  showAddSenderModal = false;
  showDeleteSenderModal = false;

  deleteEmailID!: string;

  constructor(
    private route: ActivatedRoute, 
    private repository: EmailSenderRepository,
  ) {}

  ngOnInit(): void {
    this.initParams();

    this.getEmailSender();
  }

  onSearch(event: string): void {
    this.params.search = event;
    this.params.page = 1;
    
    this.getEmailSender();
  }

  refresh(): void {
    this.initParams();
    this.search.clearSearch();

    this.getEmailSender();
  }

  pageChanged(event: number): void {
    this.params.page = event;
    this.configPage.currentPage = event;

    this.getEmailSender();
  }

  openAddSenderModal(): void {
    this.showAddSenderModal = true;
  }

  confirmAddSender(emailSenderRequestModel: EmailSenderRequestModel[]): void {
    this.showAddSenderModal = false;

    this.repository.addEmailSender(emailSenderRequestModel).subscribe(() => {
      this.getEmailSender();
    });
  }

  openDeleteSenderModal(id: string): void {
    this.showDeleteSenderModal = true;

    this.deleteEmailID = id;
  }

  confirmDeleteSender(id: string): void {
    this.showDeleteSenderModal = false;

    this.repository.deleteEmailSender(id).subscribe(() => {
      this.getEmailSender();
    });
  }

  private getEmailSender(): void {
    this.senders = undefined;

    this.repository.getEmailSender(this.params).subscribe(
      { 
        next: data => {
          this.senders = [];

          data.data?.forEach(element => {
            this.senders!.push(element);
          });

          this.configPage.totalItems = data.metadata!.totalRows;;
        },

        error: () => {
          this.senders = [];
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
