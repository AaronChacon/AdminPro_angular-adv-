import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/* Module */
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

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
    FormsModule,
    AppRoutingModule,
    SharedModule,
    ComponentsModule,
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    ChartPrimaryComponent,
    PagesComponent,
    
  ]
})
export class PagesModule { }
