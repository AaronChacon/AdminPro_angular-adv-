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
        {title: 'ProgressBar', url: 'progress'},
        {title: 'Chart', url: 'chart'},
      ],
    },  
  ]

  constructor() { }
}