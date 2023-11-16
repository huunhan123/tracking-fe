import { NgModule } from '@angular/core';

import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { MenuModule } from './menu/menu.module';

@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    HeaderModule,
    FooterModule,
    MenuModule,
    MainRoutingModule,
  ],
  exports: [
    MainComponent,
  ],
})
export class MainModule {}