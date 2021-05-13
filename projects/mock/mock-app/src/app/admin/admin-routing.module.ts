import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { MainPageComponent } from './main-page/main-page.component';
import { StartingPageComponent } from './starting-page/starting-page.component';

const routes: Routes = [
    { 
        path: '', component: AdminComponent,
        children: [
            { path: 'main', loadChildren: () => import(`./main-page/main-page.module`).then(m => m.MainPageModule) },
            { path: 'starting', component: StartingPageComponent },
            { path: '', redirectTo: 'main', pathMatch: 'full' },
            { path: '**', redirectTo: 'main' },
        ]
    }
];
@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [RouterModule]
})
export class AdminRoutingModule { }