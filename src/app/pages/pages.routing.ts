import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RxjsComponent } from './rxjs/rxjs.component';

import { AuthGuard } from '../guards/auth.guard';

/* Component */
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { ChartPrimaryComponent } from './chart-primary/chart-primary.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromiseComponent } from './promise/promise.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintenance/users/users.component';



const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent,
        canActivate:[ AuthGuard ],
        children: [
          { path: '', component: DashboardComponent, data:{title: 'Dashboard'}, },
          { path: 'progress', component: ProgressComponent, data:{title: 'Progress'}, },
          { path: 'chart', component: ChartPrimaryComponent, data:{title: 'Chart'}, },
          { path: 'account-settings', component: AccountSettingsComponent, data:{title: 'Account settings'}, },
          { path: 'promise', component: PromiseComponent, data:{title: 'Promise'}, },
          { path: 'rxjs', component: RxjsComponent, data:{title: 'Rxjs'}, },
          { path: 'profile', component: ProfileComponent, data:{title: 'Profile'}, },
    
          // Maintenance
          { path: 'users', component: UsersComponent, data:{title: 'Users'}, },
        ] 
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
