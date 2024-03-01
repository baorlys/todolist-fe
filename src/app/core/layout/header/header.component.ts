import {AfterContentInit, Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../feature/auth/service/auth.service";
import {StorageService} from "../../service/storage.service";
import {MenubarModule} from "primeng/menubar";
import { MenuItem } from 'primeng/api';
import {ToastrService} from "ngx-toastr";
import {AppService} from "../../service/app.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MenubarModule

  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  user: any;
  items: MenuItem[] | undefined;
  isLogin: boolean = false

  constructor(private auth: AuthService,
              private storage: StorageService,
              private toastr: ToastrService,
              private router : Router,
              private appService: AppService,)
  {

    this.appService.currentLogin.subscribe(value => {
      this.isLogin = value;
      this.user = this.storage.getItem('user');
    });

  }


  ngOnInit(): void {

    if(this.auth.isAuthenticated()){
      this.isLogin = true;
    }
    this.items = [
      {
        label: this.user.username,
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: ' profile',
            icon: 'pi pi-fw pi-user-edit',
            command: () => {
              this.router.navigate(['/profile']).then(r => r);
            }
          },
          {
            label: ' log out',
            icon: 'pi pi-fw pi-sign-out',
            command: () => {
              this.showLogout();
            }
          }
        ]
      }

    ]
  }



  showLogout() {
    this.toastr.warning("Are you sure you want to log out? Click to log out", "Log out",
      {
        positionClass: 'toast-top-center',
        closeButton: true,
        progressBar: true,
        progressAnimation: 'increasing',
      }).onTap.subscribe(() => {
        this.logOut();
    })
  }

  logOut() {
    this.auth.logout();
    this.isLogin = false;
    this.router.navigate(['/login']).then(r => r);
  }

  homePage() {
    this.router.navigate(['/']).then(r => r);
  }
}

export interface User {
  username: string;
  email: string;
}
