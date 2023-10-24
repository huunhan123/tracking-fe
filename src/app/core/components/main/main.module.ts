import { NgModule } from '@angular/core';

import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    HeaderModule,
    FooterModule,
    MainRoutingModule,
  ],
  exports: [
    MainComponent,
  ],
})
export class MainModule {}