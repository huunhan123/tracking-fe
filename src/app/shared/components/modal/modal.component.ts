import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() cancelButton: string = 'Cancel';
  @Input() confirmButton: string = 'Apply';

  @Input() title!: string;

  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  constructor() { }

  cancelClick(event: Event): void {
    this.cancel.emit();

    event.stopPropagation();
  }

  confirmClick(event: Event): void {
    this.confirm.emit();
    
    event.stopPropagation();
  }
}
