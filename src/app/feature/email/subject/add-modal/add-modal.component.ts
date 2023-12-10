import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { EmailSubjectRequestModel } from '../../service/subject/subject.model';

@Component({
  selector: 'app-add-subject-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css']
})
export class AddSubjectModalComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<EmailSubjectRequestModel[]>();

  selectedFile!: File;

  modalForm = this.formBuilder.nonNullable.group({
    greeting: [false, Validators.required],
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
      const greeting = this.modalForm.get('greeting')!.value;

      const reader = new FileReader();
      reader.onload = (e) => {
        const subjectsModel = this.parseSubjectsFromFile(reader.result as string, tag, greeting);
        this.confirm.emit(subjectsModel);
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

  slide(control: AbstractControl): void {
    const currentState = control.value;

    control.setValue(!currentState);
    control.markAsDirty();
    control.markAsTouched();
  }

  private parseSubjectsFromFile(data: string, tag: string, greeting: boolean): EmailSubjectRequestModel[] {
    const rawData = data.split('\n');

    const emailSubjects = rawData.map(el => {

      const subject: EmailSubjectRequestModel = {
        subject: el,
        greeting,
        tag: tag,
      };

      return subject;
    });
    console.log(emailSubjects);
    
    return emailSubjects;
  }
}
