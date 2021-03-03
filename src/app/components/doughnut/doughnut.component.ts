import { Component, Input, OnInit } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';
@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.css']
})
export class DoughnutComponent implements OnInit {

    @Input() title: string = 'Sin titulo'
    // Doughnut
    @Input('Label') public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    @Input('Dataset') public doughnutChartData: MultiDataSet = [
      [350, 450, 100],
    ];
    @Input('Colors') public colors: Color[] = [
      { backgroundColor:['#6857E6', '#009FEE', '#000'] }
    ];

  constructor() { }

  ngOnInit(): void {
  }

}
