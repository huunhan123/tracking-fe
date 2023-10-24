import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[tableTemplate]',
})
export class TableTemplate {
  constructor(public template: TemplateRef<unknown>) {}
}