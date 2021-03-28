import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu = [];

  loadMenu(){
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];
  }


  /* menu: any[] = [
    {
      title:'Dashboard',
      icon: 'mdi mdi-gauge',
      children: [
        {title: 'Main', url: '/'},
        {title: 'ProgressBar', url: '/dashboard/progress'},
        {title: 'Chart', url: '/dashboard/chart'},
        {title: 'Promise', url: '/dashboard/promise'},
        {title: 'Rxjs', url: '/dashboard/rxjs'},
      ],
    },  
    {
      title:'Maintenance',
      icon: 'mdi mdi-folder-lock-open',
      children: [
        {title: 'Users', url: 'users'},
        {title: 'Doctors', url: 'doctors'},
        {title: 'Hospitals', url: 'hospitals'},
      ],
    },  
  ] */
}
