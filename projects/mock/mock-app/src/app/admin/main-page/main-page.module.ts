import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageRoutingModule } from './main-page-routing.module';
import { TasksComponent } from './tasks/tasks.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    TasksComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
  ]
})
export class MainPageModule { }