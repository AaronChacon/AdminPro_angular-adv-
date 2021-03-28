import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SidebarService } from '../../services/sidebar.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  //menuItems: any[];
  public imgUrl = ''; 
  public user: User;

  constructor(
    public sidebarService: SidebarService,
    private userService: UserService 
  ) {
    //this.menuItems = sidebarService.menu;
    this.user = userService.user;
    
  }

  ngOnInit(): void {
  }

}
