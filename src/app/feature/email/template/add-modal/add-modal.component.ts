import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { cloneDeep } from 'lodash';

import { EmailTemplateRequestModel } from '../../service/email.model';

@Component({
  selector: 'app-add-template-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css']
})
export class AddTemplateModalComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<EmailTemplateRequestModel>();

  template: EmailTemplateRequestModel = {
    name: '',
    content: '',
    tag: '',
  };

  selectedFile!: File;

  modalForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    fileInput: ['', Validators.required],
    tag: ['', Validators.required],
  });
  
  constructor(private formBuilder: FormBuilder) { }

  cancelClick(): void {
    this.cancel.emit();
  }

  confirmClick(): void {
    this.modalForm.markAllAsTouched();

    if (this.modalForm.valid) {
      this.template.name = this.modalForm.get('name')!.value;
      this.template.tag = this.modalForm.get('tag')!.value;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.template.content = reader.result as string;
        this.confirm.emit(this.template);
      };

      reader.readAsText(this.selectedFile);
    }    
  }

  onFileSelected(event: any): void {
    const fileInput = event.target;
    if (fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }
}
