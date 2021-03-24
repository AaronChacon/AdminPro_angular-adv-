import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  private _hiddenModal: boolean = true;
  public type: 'users'| 'doctors'| 'hospitals';
  public id: string; 
  public img: string;
  public newImage: EventEmitter<string> = new EventEmitter<string>();

  get hiddenModal(){
    return this._hiddenModal;
  }

  openModal(
    type: 'users'| 'doctors'| 'hospitals',
    id: string,
    img: string = 'no-img'
  ){
    this._hiddenModal = false;
    this.type = type;
    this.id = id;
    // http://localhost:3000/api/upload/doctors/60551d4814d1863ffc81681e
    
    if (img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${ base_url }/upload/${ type }/${ img }`;
    }

    //this.img = img;
  }
  
  closeModal(){
    this._hiddenModal = true;
  }

  constructor() { }
}
