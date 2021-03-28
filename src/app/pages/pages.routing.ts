import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RxjsComponent } from './rxjs/rxjs.component';

import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';

/* Component */
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { ChartPrimaryComponent } from './chart-primary/chart-primary.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromiseComponent } from './promise/promise.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintenance/users/users.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { DoctorComponent } from './maintenance/doctors/doctor.component';
import { SearchComponent } from './search/search.component';



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
          { path: 'search/:term', component: SearchComponent, data:{title: 'Search'}, },
    
          // Maintenance
          { path: 'hospitals', component: HospitalsComponent, data:{title: 'hospitals maintenance'}, },
          { path: 'doctors', component: DoctorsComponent, data:{title: 'Doctors maintenance'}, },
          { path: 'doctors/:id', component: DoctorComponent, data:{title: 'Doctor maintenance'}, },

          // Admin route
          { path: 'users', canActivate: [ AdminGuard ], component: UsersComponent, data:{title: 'Users  maintenance'}, },
        ] 
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
