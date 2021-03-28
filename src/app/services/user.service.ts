import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import Swal from 'sweetalert2';

import { environment } from 'src/environments/environment';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { User } from '../models/user.model';
import { LoadUsers } from '../interfaces/users.interface';

const base_url = environment.base_url;

declare const gapi: any; 

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2: any;
  public user: User;

  constructor(
      private http: HttpClient,
      private router: Router,
      private ngZone: NgZone
      ) { 
    this.googleinit();
  }

  get token():string {
    return localStorage.getItem('token') || '';
  }

  get uid (): string {
    return this.user.uid || ''
  }

  get headers() {
    return {
      headers:{
        'x-token': this.token
      }
    }
  }

  saveLocalStorage(token: string, menu: any){
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu) );
  }

  async googleinit(){
    
    return new Promise<void> ( resolve => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '289539649738-ktoa3ffhq55rc9q756pidqtj6eh03qg6.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        
        resolve();
      });
    })

  }

  validateToken(): Observable<boolean> {
    return this.http.get( `${ base_url }/login/renew`, {
      headers:{
        'x-token': this.token
      }
    }).pipe(
      map((resp:any) => {
        const { name, email, img = '', google, role, uid } = resp.user;
        this.user = new User( name, email, '', img, google, role, uid );
        this.saveLocalStorage( resp.token, resp.menu );
        return true
      }),
      catchError( error => of(false))
    )
  }

  login ( formData: LoginForm ) {
    return this.http.post(`${base_url}/login`, formData)
                .pipe(
                  tap((resp:any) => {
                    this.saveLocalStorage( resp.token, resp.menu );
                  })
                )
  }
  
  loginGoogle ( token ) {
    return this.http.post(`${base_url}/login/google`, { token })
                .pipe(
                  tap((resp:any) => {
                    this.saveLocalStorage(resp.token, resp.menu);
                  })
                )
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    
    this.auth2.signOut().then( () => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });
  }

  createUser ( formData: RegisterForm ) {
    return this.http.post(`${base_url}/users`, formData)
                    .pipe(
                      tap((resp:any) => {
                        this.saveLocalStorage(resp.token, resp.menu);
                      })
                    )
  }

  updateProfile( data: { email: string, nombre: string, role: string }) {

    data = {
      ...data,
      role: this.user.role
    }
    
    return this.http.put(`${base_url}/users/${this.uid}`, data, this.headers);

  }

  loadUsers(from: number = 0) {
    const url = `${ base_url }/users?from=${ from }`
    return this.http.get<LoadUsers>( url, this.headers)
                    .pipe(
                      map(resp => {
                        const users = resp.users.map(
                          user => new User(user.name, user.email, '', user.img, user.google, user.role, user.uid)
                        );
                        return {
                          total: resp.total,
                          users
                        };
                      })
                    )
  }

  deleteUser(user: User) {
    const url = `${ base_url }/users/${user.uid}`
    return this.http.delete( url, this.headers)
  }

  saveUser( user: User) {
    return this.http.put(`${base_url}/users/${user.uid}`, user, this.headers);
  }

   



}
