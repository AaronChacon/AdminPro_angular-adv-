import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/* Module */
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

/* Component */
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent, 
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
  ]
})
export class AuthModule { }
