import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { EmailLinkRequestModel } from '../../service/link/link.model';

@Component({
  selector: 'app-add-link-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css']
})
export class AddLinkModalComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<EmailLinkRequestModel[]>();

  selectedFile!: File;

  modalForm = this.formBuilder.nonNullable.group({
    fileInput: ['', Validators.required],
    tag: ['', Validators.required],
  });
  
  constructor(private formBuilder: FormBuilder) { }

  cancelClick(): void {
    this.cancel.emit();
  }

  confirmClick(): void {
    if (this.modalForm.valid) {
      const tag = this.modalForm.get('tag')!.value;

      const reader = new FileReader();
      reader.onload = (e) => {
        const linksModel = this.parseLinksFromFile(reader.result as string, tag);
        this.confirm.emit(linksModel);
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

  private parseLinksFromFile(data: string, tag: string): EmailLinkRequestModel[] {
    const rawData = data.split('\n');

    const emailLinks = rawData.map(el => {
      const link: EmailLinkRequestModel = {
        link: el,
        tag: tag,
      };

      return link;
    });

    return emailLinks;
  }
}
