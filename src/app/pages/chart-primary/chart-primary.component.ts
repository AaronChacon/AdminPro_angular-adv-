import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-chart-primary',
  templateUrl: './chart-primary.component.html',
  styles: [
  ]
})
export class ChartPrimaryComponent implements OnInit {

  data1 = {
    title: 'Sales',
    label: ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'],
    set: [[350, 450, 100]],
    colors: [{ backgroundColor:['#6857E6', '#009FEE', '#F02059'] }]
  };
  
  data2 = {
    title: 'Acquisition',
    label: ['Lorem 2', 'Lorem 2', 'Lorem 2'],
    set: [[150, 250, 300]],
    colors: [{ backgroundColor:['#6857E6', '#009FEE', '#F02059'] }]
  };

  data3 = {
    title: 'Refund',
    label: ['Lorem 3', 'Lorem 3', 'Lorem 3'],
    set: [[850, 190, 500]],
    colors: [{ backgroundColor:['#6857E6', '#009FEE', '#F02059'] }]
  };
  
  data4 = {
    title: 'Settlement',
    label: ['Lorem 4', 'Lorem 4', 'Lorem 4'],
    set: [[350, 450, 100]],
    colors: [{ backgroundColor:['#6857E6', '#009FEE', '#F02059'] }]
  };

  constructor() { }

  ngOnInit(): void {
    
  }

}
