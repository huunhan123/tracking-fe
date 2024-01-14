import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-template-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteTemplateModalComponent {
  @Input() id!: string;

  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<string>();
  
  constructor() { }

  cancelClick(): void {
    this.cancel.emit();
  }

  confirmClick(): void {
    this.confirm.emit(this.id);
  }
}
