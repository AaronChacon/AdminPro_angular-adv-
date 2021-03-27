import { Component, OnDestroy, OnInit } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import Swal from 'sweetalert2';
import { ModalImageService } from '../../../services/modal-image.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { SearchesService } from '../../../services/searches.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: [
  ]
})
export class HospitalsComponent implements OnInit, OnDestroy {

  public hospitals: Hospital[] = [];
  public hospitalsTemp: Hospital[] = [];
  public loading: boolean = true;
  public imgSubs: Subscription;

  constructor(
    private hospitalService: HospitalService,
    private modalImageService: ModalImageService,
    private searchesService: SearchesService,

  ) { }
  
  ngOnInit(): void {

    this.loadHospitals();

    this.imgSubs = this.modalImageService.newImage
    .pipe( delay(1000))
    .subscribe(img => this.loadHospitals());
 
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  loadHospitals() {
    this.loading = true;

    this.hospitalService.getHospitals()
      .subscribe(hospitals  =>{
        this.loading = false;
        this.hospitals = hospitals
        this.hospitalsTemp = hospitals
      })
  }

  saveChanges( hospital: Hospital ){
    
    this.hospitalService.updateHospital(hospital._id, hospital.name)
        .subscribe(resp => {
          console.log(resp);
          
          Swal.fire('Update', hospital.name, 'success')
        });
  }
  
  deleteHospital( hospital: Hospital ){ 
    this.hospitalService.deleteHospital(hospital._id)
        .subscribe(resp => {
          console.log(resp);
          this.loadHospitals();
          Swal.fire('Delete', hospital.name, 'success')
        });
  }

  async openSweetAlert(){
    const { value = '' } = await Swal.fire<string>({
      input: 'text',
      title: 'New Hospital',
      inputPlaceholder: 'Hospital name',
      showCancelButton: true,
    })

    if( value.trim().length > 0  ){
      this.hospitalService.createHospital(value)
          .subscribe((resp: {ok: boolean, hospital: Hospital}) => {
            console.log(resp);
            this.hospitals.push( resp.hospital )
          })
    }

    console.log(value);
    
  }

  openModal( hospital: Hospital ){
    this.modalImageService.openModal( 'hospitals', hospital._id, hospital.img );
  }

  search(term: string){
    
    if (term.length === 0) {
      return this.hospitals = this.hospitalsTemp
    }

    this.searchesService.search('hospitals', term)
        .subscribe(results => {
          console.log(results);
          
          this.hospitals = results
        })
  }

}
