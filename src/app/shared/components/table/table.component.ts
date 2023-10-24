import { Component, ContentChild, Input } from '@angular/core';

import { TableTemplate } from './table-template.directive';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent{
  @Input() data?: Object[];
  @Input() columnSpan!: number;

  @ContentChild(TableTemplate) bodyTemplate!: TableTemplate;
}
