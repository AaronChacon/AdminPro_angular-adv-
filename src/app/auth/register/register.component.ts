import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css',
  ]
})
export class RegisterComponent {

  public formSubmitted = false

  public registerForm = this.fb.group({
    name: ['Oriana Segura', Validators.required ],
    email: ['mail@orianasegura.com', [ Validators.required, Validators.email ]],
    password: ['1234567', [ Validators.required, Validators.minLength(6) ] ],
    passwordConfirm: ['1234567', [ Validators.required, Validators.minLength(6) ] ],
    terms: [ true, Validators.required ],
  }, {
    validators: this.passwordMatch('password', 'passwordConfirm')
  });

  constructor(
      private fb: FormBuilder,
      private userService: UserService,
      private router: Router
  ) { }

  createUser() {
    this.formSubmitted = true;
    
    if ( this.registerForm.invalid ) {
      return;
    }

    // Perform user creation

    this.userService.createUser( this.registerForm.value )
      .subscribe( resp => {
        Swal.fire('Success', 'User created', 'success')
        this.router.navigateByUrl('/')
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error')
    });

    


      

  }

  Invalidfield( field: string): boolean {
    
    if ( this.registerForm.get(field).invalid && this.formSubmitted ) {
      return true;
    } else {
      return false
    }

  }

  invalidPasswords(){

    const password = this.registerForm.get('password').value;
    const passwordConfirm = this.registerForm.get('passwordConfirm').value;

    if ((password !== passwordConfirm) && this.formSubmitted) {
      return true
    } else {
      return false
    }

  }

  termsAccepted() {
    return !this.registerForm.get('terms').value && this.formSubmitted;
  }

  passwordMatch(passPrimary:string, passConfirm: string) {

    return (formGroup: FormGroup) => {

      const pass1Control = formGroup.get(passPrimary);
      const pass2Control = formGroup.get(passConfirm);

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ notMatch: true })
      }

    }

  }


}
