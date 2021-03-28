import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { User } from 'src/app/models/user.model';
import { SearchesService } from '../../services/searches.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [ 
  ]
})
export class SearchComponent implements OnInit {

  public users: User[] = [];
  public doctors: Doctor[] = [];
  public hospitals: Hospital[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchesService: SearchesService,
    private route: Router,
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params
        .subscribe(({ term }) => {
          console.log(term)
          this.globalSearch(term)
        })

  }


  globalSearch(term: string) {
    this.searchesService.globalSearch(term)
        .subscribe((resp:any) => {
          console.log(resp)
          const { users, hospitals, doctors } = resp;
          this.hospitals = hospitals;
          this.users = users;
          this.doctors = doctors;
        })
  }

  openDoctor(doctor: Doctor) {
    console.log(doctor);
    this.route.navigateByUrl(`/dashboard/doctors/${ doctor._id }`);
  }


}
