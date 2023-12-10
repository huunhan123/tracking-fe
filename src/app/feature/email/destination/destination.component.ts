import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SearchComponent } from 'src/app/shared/components/search/search.component';
import { ConfigPage, Params } from '../../common.type';
import { EmailRepository } from '../service/email.repository';
import { EmailDestinationModel, EmailDestinationRequestModel } from '../service/email.model';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {
  @ViewChild('search') private search!: SearchComponent;

  params!: Params;
  destinations!: EmailDestinationModel[] | undefined;
  configPage!: ConfigPage;

  showAddDestinationModal = false;
  showDeleteDestinationModal = false;

  deleteEmailID!: string;

  constructor(
    private route: ActivatedRoute, 
    private repository: EmailRepository,
  ) {}

  ngOnInit(): void {
    this.initParams();

    this.getEmailDestination();
  }

  onSearch(event: string): void {
    this.params.search = event;
    this.params.page = 1;
    
    this.getEmailDestination();
  }

  refresh(): void {
    this.initParams();
    this.search.clearSearch();

    this.getEmailDestination();
  }

  pageChanged(event: number): void {
    this.params.page = event;
    this.configPage.currentPage = event;

    this.getEmailDestination();
  }

  openAddDestinationModal(): void {
    this.showAddDestinationModal = true;
  }

  confirmAddDestination(emailDestinationRequestModel: EmailDestinationRequestModel[]): void {
    this.showAddDestinationModal = false;

    this.repository.addEmailDestination(emailDestinationRequestModel).subscribe(() => {
      this.getEmailDestination();
    });
  }

  openDeleteDestinationModal(id: string): void {
    this.showDeleteDestinationModal = true;

    this.deleteEmailID = id;
  }

  confirmDeleteDestination(id: string): void {
    this.showDeleteDestinationModal = false;

    this.repository.deleteEmailDestination(id).subscribe(() => {
      this.getEmailDestination();
    });
  }

  private getEmailDestination(): void {
    this.destinations = undefined;

    this.repository.getEmailDestination(this.params).subscribe(
      { 
        next: data => {
          this.destinations = [];

          data.data?.forEach(element => {
            this.destinations!.push(element);
          });

          this.configPage.totalItems = data.metadata!.totalRows;;
        },

        error: () => {
          this.destinations = [];
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
      totalItems: 0,
    }
  }
}
