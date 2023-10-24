import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent {
  @Input() text: string = 'Not found';
  @Input() redirect?: string;
  @Input() redirectText?: string = 'Back';
}