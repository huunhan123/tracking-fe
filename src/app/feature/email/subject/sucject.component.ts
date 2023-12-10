import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SearchComponent } from 'src/app/shared/components/search/search.component';
import { ConfigPage, Params } from '../../common.type';
import { EmailSubjectRepository } from '../service/subject/subject.repository';
import { EmailSubjectModel, EmailSubjectRequestModel } from '../service/subject/subject.model';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  @ViewChild('search') private search!: SearchComponent;

  params!: Params;
  subjects!: EmailSubjectModel[] | undefined;
  configPage!: ConfigPage;

  showAddSubjectModal = false;
  showDeleteSubjectModal = false;

  deleteEmailID!: string;

  constructor(
    private route: ActivatedRoute, 
    private repository: EmailSubjectRepository,
  ) {}

  ngOnInit(): void {
    this.initParams();

    this.getEmailSubject();
  }

  onSearch(event: string): void {
    this.params.search = event;
    this.params.page = 1;
    
    this.getEmailSubject();
  }

  refresh(): void {
    this.initParams();
    this.search.clearSearch();

    this.getEmailSubject();
  }

  pageChanged(event: number): void {
    this.params.page = event;
    this.configPage.currentPage = event;

    this.getEmailSubject();
  }

  openAddSubjectModal(): void {
    this.showAddSubjectModal = true;
  }

  confirmAddSubject(emailSubjectRequestModel: EmailSubjectRequestModel[]): void {
    this.showAddSubjectModal = false;

    this.repository.addEmailSubject(emailSubjectRequestModel).subscribe(() => {
      this.getEmailSubject();
    });
  }

  openDeleteSubjectModal(id: string): void {
    this.showDeleteSubjectModal = true;

    this.deleteEmailID = id;
  }

  confirmDeleteSubject(id: string): void {
    this.showDeleteSubjectModal = false;

    this.repository.deleteEmailSubject(id).subscribe(() => {
      this.getEmailSubject();
    });
  }

  private getEmailSubject(): void {
    this.subjects = undefined;

    this.repository.getEmailSubject(this.params).subscribe(
      { 
        next: data => {
          this.subjects = [];

          data.data?.forEach(element => {
            this.subjects!.push(element);
          });

          this.configPage.totalItems = data.metadata!.totalRows;;
        },

        error: () => {
          this.subjects = [];
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
