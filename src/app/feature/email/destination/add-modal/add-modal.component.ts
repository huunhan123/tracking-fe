import { Component, EventEmitter, Output } from '@angular/core';
import { EmailDestinationRequestModel } from '../../service/email.model';

@Component({
  selector: 'app-add-destination-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css']
})
export class AddDestinationModalComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<EmailDestinationRequestModel[]>();

  destinations!: EmailDestinationRequestModel[];
  
  constructor() { }

  cancelClick(): void {
    this.cancel.emit();
  }

  confirmClick(): void {
    this.confirm.emit(this.destinations);
  }

  onFilesSelected(event: any) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const fileReader = new FileReader();

      fileReader.onload = (e) => {
        this.destinations = this.parseDestinationsFromFile(fileReader.result as string);
      };

      fileReader.readAsText(selectedFile);
    }
  }

  private parseDestinationsFromFile(data: string): EmailDestinationRequestModel[] {
    const rawData = data.split('\n');

    const emailDestinations = rawData.map(el => {
      const [name, email] = el.split('|');

      const destination: EmailDestinationRequestModel = {
        name,
        email,
      };

      return destination;
    });

    return emailDestinations;
  }
}
