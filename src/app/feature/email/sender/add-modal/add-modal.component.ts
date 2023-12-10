import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { EmailSenderRequestModel } from '../../service/email.model';

@Component({
  selector: 'app-add-sender-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css']
})
export class AddSenderModalComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<EmailSenderRequestModel[]>();

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
        const sendersModel = this.parseSendersFromFile(reader.result as string, tag);
        this.confirm.emit(sendersModel);
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

  private parseSendersFromFile(data: string, tag: string): EmailSenderRequestModel[] {
    const rawData = data.split('\n');

    const emailSenders = rawData.map(el => {
      const [email, password] = el.split('|');

      const sender: EmailSenderRequestModel = {
        email,
        password,
        tag: tag,
      };

      return sender;
    });

    return emailSenders;
  }
}
