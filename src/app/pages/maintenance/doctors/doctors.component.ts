import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from '../../../services/doctor.service';
import { ModalImageService } from '../../../services/modal-image.service';
import { SearchesService } from '../../../services/searches.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: [
  ]
})
export class DoctorsComponent implements OnInit, OnDestroy {

  public doctors: Doctor[] = []
  public doctorsTemp: Doctor[] = []
  public loading: Boolean = true;
  public imgSubs: Subscription;

  constructor(
    private doctorService: DoctorService,
    private modalImageService: ModalImageService,
    private searchesService: SearchesService,
  ) { }

  ngOnInit(): void { 
    this.loadDoctors()

    this.imgSubs = this.modalImageService.newImage
    .pipe( delay(1000))
    .subscribe(img => this.loadDoctors());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe()
  }

  loadDoctors() {
    this.loading = true;
    this.doctorService.getDoctors()
        .subscribe( doctors => {
          console.log(doctors)
          this.loading = false;
          this.doctors = doctors;
          this.doctorsTemp = doctors;
        })
  }

  openModal( doctor: Doctor) {
    this.modalImageService.openModal( 'doctors', doctor._id, doctor.img );
  }

  search(term: string){
    
    if (term.length === 0) {
      return this.doctors = this.doctorsTemp
    }

    this.searchesService.search('doctors', term)
        .subscribe(results => {
          console.log(results);
          this.doctors = results
        })
  }

  deleteDoctor(doctor: Doctor){

    Swal.fire({
      title: 'Delete user?',
      text: `Are you sure you want to eliminate ${doctor.name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.doctorService.deleteDoctor(doctor._id)
          .subscribe(resp => {
            this.loadDoctors();

            Swal.fire(
            'Deleted!',
            `${doctor.name} was eliminated`,
            'success'
            );

          })
      }
    })

  }

}
