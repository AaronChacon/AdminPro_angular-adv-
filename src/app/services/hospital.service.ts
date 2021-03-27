import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class HospitalService {

  public hospital: Hospital

  constructor(
    private http: HttpClient,

  ) { }

  get token():string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers:{
        'x-token': this.token
      }
    }
  }
 
  getHospitals() {
    const url = `${ base_url }/hospitals`
    return this.http.get( url, this.headers)
                    .pipe(
                      map((resp: {ok: true, hospitals: Hospital[]}) => resp.hospitals)
                    )
  }
  
  createHospital(name: string) {
    const url = `${ base_url }/hospitals`
    return this.http.post( url, { name} , this.headers);
  }
  
  updateHospital(id: string, name: string) {
    const url = `${ base_url }/hospitals/${ id }`
    return this.http.put( url, { name} , this.headers);
  }
  
  deleteHospital(id: string) {
    const url = `${ base_url }/hospitals/${ id }`
    return this.http.delete( url, this.headers);
  }


}
