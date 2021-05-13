import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page.component';
import { TasksComponent } from './tasks/tasks.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
    { 
        path: '', component: MainPageComponent,
        children: [
            { path: 'tasks', component: TasksComponent },
            { path: 'users', component: UsersComponent },
            { path: '', redirectTo: 'tasks', pathMatch: 'full' },
            { path: '**', redirectTo: 'tasks' },
        ]
    }
];
@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [RouterModule]
})
export class MainPageRoutingModule { }