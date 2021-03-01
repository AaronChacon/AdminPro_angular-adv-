import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Component */
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { ChartPrimaryComponent } from './pages/chart-primary/chart-primary.component';
import { PagesComponent } from './pages/pages.component';
import { NotpagefoundComponent } from './notpagefound/notpagefound.component';

const routes: Routes = [

  { 
    path: '', 
    component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'chartPrimary', component: ChartPrimaryComponent },
      { path: '', redirectTo:'/dashboard', pathMatch: 'full'},
    ] 
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  { path: '**', component: NotpagefoundComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,

  ]
})
export class AppRoutingModule { }
