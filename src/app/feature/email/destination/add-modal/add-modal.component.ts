import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { EmailDestinationRequestModel } from '../../service/destination/destination.model';

@Component({
  selector: 'app-add-destination-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css']
})
export class AddDestinationModalComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<EmailDestinationRequestModel[]>();
  
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
        const sendersModel = this.parseDestinationsFromFile(reader.result as string, tag);
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

  private parseDestinationsFromFile(data: string, tag: string): EmailDestinationRequestModel[] {
    const rawData = data.split('\n');

    const emailDestinations = rawData.map(el => {
      const [name, email] = el.split('|');

      const destination: EmailDestinationRequestModel = {
        name,
        email,
        tag, 
      };

      return destination;
    });

    return emailDestinations;
  }
}
