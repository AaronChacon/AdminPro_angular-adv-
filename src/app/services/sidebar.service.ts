import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
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
  ]

  constructor() { }
}
