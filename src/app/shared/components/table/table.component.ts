import { Component, ContentChild, Input } from '@angular/core';

import { TableTemplate } from './table-template.directive';
import { ConfigPage } from 'src/app/feature/common.type';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent{
  @Input() data?: Object[];
  @Input() columnSpan!: number;
  @Input() configPage!: ConfigPage;

  @ContentChild(TableTemplate) bodyTemplate!: TableTemplate;
}
