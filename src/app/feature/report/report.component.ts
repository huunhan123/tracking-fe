import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SearchComponent } from 'src/app/shared/components/search/search.component';
import { ReportModel } from './service/report.model';
import { ConfigPage, Params } from '../common.type';
import { ReportRepository } from './service/report.repository';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  @ViewChild('search') private search!: SearchComponent;

  params!: Params;
  reports!: ReportModel[] | undefined;
  configPage!: ConfigPage;

  showAddSenderModal = false;
  showDeleteSenderModal = false;

  deleteEmailID!: string;

  constructor(
    private route: ActivatedRoute, 
    private repository: ReportRepository,
  ) {}

  ngOnInit(): void {
    this.initParams();

    this.getReport();
  }

  onSearch(event: string): void {
    this.params.search = event;
    this.params.page = 1;
    
    this.getReport();
  }

  refresh(): void {
    this.initParams();
    this.search.clearSearch();

    this.getReport();
  }

  pageChanged(event: number): void {
    this.params.page = event;
    this.configPage.currentPage = event;

    this.getReport();
  }

  private getReport(): void {
    this.reports = undefined;

    this.repository.getReport(this.params).subscribe(
      { 
        next: data => {
          this.reports = [];

          data.data?.forEach(element => {
            this.reports!.push(element);
          });

          this.configPage.totalItems = data.metadata!.totalRows;;
        },

        error: () => {
          this.reports = [];
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
