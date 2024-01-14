import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SearchComponent } from 'src/app/shared/components/search/search.component';
import { ConfigPage, Params } from '../../common.type';
import { EmailLinkRepository } from '../service/link/link.repository';
import { EmailLinkModel, EmailLinkRequestModel } from '../service/link/link.model';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {
  @ViewChild('search') private search!: SearchComponent;

  params!: Params;
  links!: EmailLinkModel[] | undefined;
  configPage!: ConfigPage;

  showAddLinkModal = false;
  showDeleteLinkModal = false;

  deleteEmailID!: string;

  constructor(
    private route: ActivatedRoute, 
    private repository: EmailLinkRepository,
  ) {}

  ngOnInit(): void {
    this.initParams();

    this.getEmailLink();
  }

  onSearch(event: string): void {
    this.params.search = event;
    this.params.page = 1;
    
    this.getEmailLink();
  }

  refresh(): void {
    this.initParams();
    this.search.clearSearch();

    this.getEmailLink();
  }

  pageChanged(event: number): void {
    this.params.page = event;
    this.configPage.currentPage = event;

    this.getEmailLink();
  }

  openAddLinkModal(): void {
    this.showAddLinkModal = true;
  }

  confirmAddLink(emailLinkRequestModel: EmailLinkRequestModel[]): void {
    this.showAddLinkModal = false;

    this.repository.addEmailLink(emailLinkRequestModel).subscribe(() => {
      this.getEmailLink();
    });
  }

  openDeleteLinkModal(id: string): void {
    this.showDeleteLinkModal = true;

    this.deleteEmailID = id;
  }

  confirmDeleteLink(id: string): void {
    this.showDeleteLinkModal = false;

    this.repository.deleteEmailLink(id).subscribe(() => {
      this.getEmailLink();
    });
  }

  private getEmailLink(): void {
    this.links = undefined;

    this.repository.getEmailLink(this.params).subscribe(
      { 
        next: data => {
          this.links = [];

          data.data?.forEach(element => {
            this.links!.push(element);
          });

          this.configPage.totalItems = data.metadata!.totalRows;;
        },

        error: () => {
          this.links = [];
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
