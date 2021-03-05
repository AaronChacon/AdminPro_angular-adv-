import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

/* Component */
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { ChartPrimaryComponent } from './chart-primary/chart-primary.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromiseComponent } from './promise/promise.component';
import { RxjsComponent } from './rxjs/rxjs.component';


const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent,
        children: [
          { path: '', component: DashboardComponent, data:{title: 'Dashboard'}, },
          { path: 'progress', component: ProgressComponent, data:{title: 'Progress'}, },
          { path: 'chart', component: ChartPrimaryComponent, data:{title: 'Chart'}, },
          { path: 'account-settings', component: AccountSettingsComponent, data:{title: 'Account settings'}, },
          { path: 'promise', component: PromiseComponent, data:{title: 'Promise'}, },
          { path: 'rxjs', component: RxjsComponent, data:{title: 'Rxjs'}, },
        ] 
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
