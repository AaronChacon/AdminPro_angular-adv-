import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { User } from 'src/app/models/user.model';
import { UserService } from '../../services/user.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup;
  public user: User;
  public uploadImage: File;
  public imgTemp: any = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private fileUploadService: FileUploadService,
  ) {
    this.user = userService.user;
    
  }

  ngOnInit(): void {

    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required ],
      email: [this.user.email, [ Validators.required, Validators.email ] ],
    })

    
  }
  
  updateProfile() {
    console.log(this.profileForm.value);
    this.userService.updateProfile(this.profileForm.value)
      .subscribe( resp => {
        const { name, email } = this.profileForm.value
        this.user.name = name;
        this.user.email = email;

        Swal.fire('Save', 'Your changes were saved', 'success');
      }, (err) => {
        console.log(err.error.msg);
        Swal.fire('Error', err.error.msg, 'error');
      }
      
      );
      

  }

  changeImage(file:File){
    console.log(file);
    this.uploadImage = file;

    if (!file) {
      return this.imgTemp = null;
    }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

  }

  uploadFile(){
    this.fileUploadService.updatePhoto( this.uploadImage, 'users', this.user.uid )
      .then(file => {
        console.log(file);
        this.user.img = file;
        Swal.fire('Save', 'Your changes were saved', 'success');
      }).catch(err => {
        console.log(err);
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

}
