import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private stylesheet = document.querySelector('#theme');
  private url = localStorage.getItem('theme');

  constructor() {
  }

  getTheme() {
    if (this.url === '' || this.url === null ||  this.url === undefined) {
      //console.log(this.url);
      this.url = '/assets/css/colors/default-dark.css'
      this.stylesheet.setAttribute('href', this.url);
      localStorage.setItem('theme', this.url);

    } else {
      //console.log(this.url);
      this.stylesheet.setAttribute('href', this.url);
    }
  } 

  changeTheme(theme: string){
    const url = `/assets/css/colors/${theme}.css`
    this.stylesheet.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme(){
    const color = localStorage.getItem('theme')
    const colorTheme = `${color.slice(19, -4)}-theme`;
    const links = document.querySelectorAll('.selector');

    links.forEach(element => {
      element.classList.remove('working');
      
      if (element.classList.contains(colorTheme))  {
        element.classList.add('working');
      }

    })

  }
}
