import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../../services/user.service';
import { SearchesService } from '../../../services/searches.service';
import { delay } from 'rxjs/operators';
import { ModalImageService } from '../../../services/modal-image.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit, OnDestroy {

  public totalUsers: number = 0;
  public users: User[] = [];
  public usersTemp: User[] = [];
  public from: number = 0;
  public loading: boolean = true;
  public imgSubs: Subscription;

  constructor( 
    private userService: UserService,
    private searchesService: SearchesService,
    private modalImageService: ModalImageService,
    ) { }

  ngOnInit(): void {
    this.loadUsers();
    this.imgSubs = this.modalImageService.newImage
      .pipe( delay(1000))
      .subscribe(img => this.loadUsers());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  loadUsers(){
    this.loading = true;
    this.userService.loadUsers(this.from)
      .subscribe( ({total, users}) => {
        console.log(users);
        this.totalUsers = total;
        this.users = users
        this.usersTemp = users
        this.loading = false;
      });

  }

  changePage(value: number){
    this.from += value;

    if (this.from <0) {
      this.from = 0
    } else if ( this.from > this.totalUsers ){
      this.from -= value;
    }

    this.loadUsers();
  }

  search(term: string){

    if (term.length === 0) {
      return this.users = this.usersTemp
    }

    this.searchesService.search('users',term)
        .subscribe((results: User[]) => {
          this.users = results
        })
  }

  deleteUser(user: User) {

    if (user.uid === this.userService.uid) {
      return Swal.fire('Erro', 'You can`t delete yourself', 'error')
    }


    Swal.fire({
      title: 'Delete user?',
      text: `Are you sure you want to eliminate ${user.name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.userService.deleteUser(user)
          .subscribe(resp => {
            this.loadUsers();

            Swal.fire(
            'Deleted!',
            `${user.name} was eliminated`,
            'success'
            );

          })
      }
    })
    
  }

  saveUser(user: User){
    this.userService.saveUser(user)
    .subscribe( resp => {
      console.log(resp);
    })
  } 

  openImageModal(user: User){
    console.log(user);
    this.modalImageService.openModal( 'users', user.uid, user.img );
  }

}
