import { Component, OnInit } from '@angular/core';
import { resolve } from 'dns';
import { rejects } from 'node:assert';
import { promise } from 'selenium-webdriver';

@Component({
  selector: 'app-promise',
  templateUrl: './promise.component.html',
  styleUrls: ['./promise.component.css']
})
export class PromiseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    

    /* const promise = new Promise((resolve, rejects) =>{
      if (false) {
        resolve('Success');
      } else {
        rejects('Error!! - Promise rejects')
      }});
    promise
      .then( message => console.log(message))
      .catch( error => console.log(error))
    
    console.log('fin del init'); */


    this.getUsers().then(users => {
        console.log(users);
    })

  }

  getUsers(){

    return new Promise( resolve => {
      fetch('https://reqres.in/api/users')
        .then(resp => resp.json())
        .then(body =>  resolve(body.data))
    });

  }

}
