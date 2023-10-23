import { NgModule } from '@angular/core';

import { MenuComponent } from './menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MenuComponent,
  ],
  imports: [
    RouterModule,
  ],
  exports: [
    MenuComponent,
  ],
})
export class MenuModule {}