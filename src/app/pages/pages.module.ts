import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/* Module */
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
/* Component */
import { ChartPrimaryComponent } from './chart-primary/chart-primary.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    ChartPrimaryComponent,
    PagesComponent,

  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    ChartPrimaryComponent,
    PagesComponent,
    
  ]
})
export class PagesModule { }
