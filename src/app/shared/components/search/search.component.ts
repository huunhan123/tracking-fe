import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Input() placeholder?: string;
  
  @Output() search = new EventEmitter<string>();

  @ViewChild('input', {static: true}) input!: ElementRef<HTMLInputElement>;

  trimmedValue = '';

  constructor(private renderer2: Renderer2) { }

  clearSearch(): void {
   this.renderer2.setProperty(this.input.nativeElement, 'value', '');
   this.trimmedValue = '';
  }

  updateTrimmedValue(): void {
    this.trimmedValue = this.input.nativeElement.value.trim();
  }

  clickButton(): void{
    this.renderer2.setProperty(this.input.nativeElement, 'value', this.trimmedValue);
    this.search.emit(this.trimmedValue);
  }
}
