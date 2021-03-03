import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [ './progress.component.css',
  ] 
})
export class ProgressComponent {

  progressPrimary: number = 20;
  progressSecondary: number = 30;

  getProgressPrimary(){
    return `${this.progressPrimary}%`;
  }
  
  getProgressSecondary(){
    return `${this.progressSecondary}%`;
  }

  childValueChange(value: number){
    console.log('hey ' + value);
    
  }

}
