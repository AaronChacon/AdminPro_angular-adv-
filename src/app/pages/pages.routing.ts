import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

/* Component */
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { ChartPrimaryComponent } from './chart-primary/chart-primary.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';


const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent,
        children: [
          { path: '', component: DashboardComponent },
          { path: 'progress', component: ProgressComponent },
          { path: 'chart', component: ChartPrimaryComponent },
          { path: 'account-settings', component: AccountSettingsComponent }
        ] 
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
