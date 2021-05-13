import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { StartingPageComponent } from './starting-page/starting-page.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    MainPageComponent,
    StartingPageComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }