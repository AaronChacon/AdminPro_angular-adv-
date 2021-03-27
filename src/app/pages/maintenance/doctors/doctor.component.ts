import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../../services/hospital.service';
import { DoctorService } from '../../../services/doctor.service';
import { Doctor } from 'src/app/models/doctor.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [
  ]
})
export class DoctorComponent implements OnInit {

  public doctorForm: FormGroup;
  public hospitals: Hospital[] = [];

  public hospitalSelected: Hospital;
  public doctorSelected: Doctor;

  constructor(
    private fb: FormBuilder,
    private hospitalService: HospitalService,
    private doctorService: DoctorService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) {}

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({ id }) => {
      this.loadDoctor(id);
    })

    
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required]
    })

    this.loadHospitals();
    
    this.doctorForm.get('hospital').valueChanges
        .subscribe( hospitalId => {
          this.hospitalSelected = this.hospitals.find(h => h._id === hospitalId);
        })
  }

  loadDoctor(id: string) {

    if ( id === 'new' ) {
      console.log(id);
      
      return;
    }

    this.doctorService.getDoctorById(id)
        .pipe(
          delay(100)
        )
        .subscribe(doctor => {
          
          if (!doctor) {
            return this.router.navigateByUrl('/dashboard/doctors');
          }

          const {name, hospital: {_id} } = doctor; 
          this.doctorSelected = doctor;
          this.doctorForm.setValue({name, hospital: _id})
        })
  }

  loadHospitals() {
    this.hospitalService.getHospitals()
        .subscribe( (hospitals: Hospital[]) => {
          this.hospitals = hospitals;
        })
  }

  saveDoctor(){
    const { name } = this.doctorForm.value;

    if (this.doctorSelected) {
      // update
      const data = {
        ... this.doctorForm.value,
        _id: this.doctorSelected._id
      }
      this.doctorService.updateDoctor(data)
          .subscribe(resp => {
            Swal.fire('Updated', `${ name } was Updated successfully`, 'success')
          })
          
    } else {
      // create
      this.doctorService.createDoctor(this.doctorForm.value)
          .subscribe((resp: any) => {
            Swal.fire('New doctor', `${ name } created correctly `, 'success');
            this.router.navigateByUrl(`/dashboard/doctors/ ${ resp.doctor._id }`)
    
            setTimeout(() => {
              Swal.fire('You were redirected', `You can edit it ${ name }`, 'info');
            }, 2000);
    
          })
    }
  }

}
