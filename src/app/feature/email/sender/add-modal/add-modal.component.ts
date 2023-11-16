import { Component, EventEmitter, Output } from '@angular/core';
import { EmailSenderRequestModel } from '../../service/email.model';

@Component({
  selector: 'app-add-sender-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css']
})
export class AddSenderModalComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<EmailSenderRequestModel[]>();

  senders!: EmailSenderRequestModel[];
  
  constructor() { }

  cancelClick(): void {
    this.cancel.emit();
  }

  confirmClick(): void {
    this.confirm.emit(this.senders);
  }

  onFilesSelected(event: any) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const fileReader = new FileReader();

      fileReader.onload = (e) => {
        this.senders = this.parseSendersFromFile(fileReader.result as string);
      };

      fileReader.readAsText(selectedFile);
    }
  }

  private parseSendersFromFile(data: string): EmailSenderRequestModel[] {
    const rawData = data.split('\n');

    const emailSenders = rawData.map(el => {
      const [email, password] = el.split('|');

      const sender: EmailSenderRequestModel = {
        email,
        password,
      };

      return sender;
    });

    return emailSenders;
  }
}
