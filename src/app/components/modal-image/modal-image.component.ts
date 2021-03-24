import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { ModalImageService } from '../../services/modal-image.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})
export class ModalImageComponent implements OnInit {

  
  public user: User;
  public uploadImage: File;
  public imgTemp: any = null;

  constructor(
    public modalImageService : ModalImageService,
    public fileUploadService: FileUploadService
  ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.imgTemp = null;
    this.modalImageService.closeModal()
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

    const id = this.modalImageService.id;
    const type = this.modalImageService.type;

    this.fileUploadService.updatePhoto( this.uploadImage, type, id )
      .then(file => {
        Swal.fire('Save', 'Your changes were saved', 'success');
        this.modalImageService.newImage.emit(file);
        this.closeModal();
      }).catch(err => {
        console.log(err);
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

}
