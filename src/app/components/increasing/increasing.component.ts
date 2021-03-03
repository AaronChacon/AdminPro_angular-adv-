import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-increasing',
  templateUrl: './increasing.component.html',
  styleUrls: ['./increasing.component.css']
})
export class IncreasingComponent implements OnInit {

  @Input('value') progress: number;
  @Input('btn') btnClass: string;

  @Output('value') valueOut: EventEmitter<number> = new EventEmitter<number>();

  constructor() { 
    this.progress = 50;
    this.btnClass = 'btn btn-primary';
  }

  ngOnInit(): void {
  }

 /*  get getProgress() {
    return `${this.progress}%`
  } */

  changeValue(value:number){

    if( this.progress >= 100 && value >= 0){
      this.valueOut.emit(100)
      return this.progress = 100;
    }
    
    if( this.progress <= 0 && value < 0){
      this.valueOut.emit(0)
      return this.progress = 0;
    }

    this.progress = this.progress + value;
    this.valueOut.emit( this.progress ); 
  }

  onChange( NewValue: number){

    if (NewValue >= 100) {
      this.progress = 100;
    } else if (NewValue <= 0) {
      this.progress = 0;
    }else{
      this.progress = NewValue;
    }

      this.valueOut.emit( this.progress );
  }


}
