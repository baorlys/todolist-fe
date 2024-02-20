import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthService} from "../../../feature/auth/service/auth.service";
import {StorageService} from "../../service/storage.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [

  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  user: any;
  isLoggin: boolean = false;
  constructor(private auth: AuthService, private storage: StorageService) { }

  ngOnInit(): void {
    if(this.auth.isAuthenticated()){
      this.user = this.storage.getItem('user');
      this.isLoggin = true;
    }
  }

  logOut() {
    const confirm = window.confirm('Are you sure you want to log out?');
    if(confirm){
      this.auth.logout();
      this.isLoggin = false;
    }
  }
}

export interface User {
  username: string;
  email: string;
}
