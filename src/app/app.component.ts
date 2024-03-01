import {Component, Input, Output, ViewChild} from "@angular/core";
import {RouterModule, RouterOutlet} from "@angular/router";
import {HeaderComponent} from "./core/layout/header/header.component";
import {animate, group, query, style, transition, trigger} from "@angular/animations";
import {CommonModule} from "@angular/common";
import {StorageService} from "./core/service/storage.service";
import {MenuItem} from "primeng/api";
import {LoginComponent} from "./feature/auth/login/login.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    CommonModule,
  ],
  animations: [
    trigger('slideInOut', [
      transition('* => *, :enter', [
        query(':enter, :leave', style({position: 'absolute', width: '100%'}), {optional: true}),
        query(':enter', style({transform: 'translateX(-100vw)'}), {optional: true}),
        query(':leave', style({transform: 'translateX(0vw)'}), {optional: true}),

        group([
          query(':leave', [
            animate('500ms ease-in-out', style({
              transform: 'translateX(100vw)'
            }))
          ], {optional: true}),
          query(':enter', [
            animate('500ms ease-in-out', style({
              transform: 'translateX(0)'
            }))
          ], {optional: true})
        ])
      ])
    ])
  ]

})
export class AppComponent {


  constructor(private storage: StorageService,
  ) {
    // let user = this.storage.getItem('user');
    //
    // this.isLogin = this.storage.checkLogin();
    // this.items = [
    //   {
    //     label: user.username,
    //     icon: 'pi pi-fw pi-user',
    //     items: [
    //       {
    //         label: ' profile',
    //         icon: 'pi pi-fw pi-user-edit',
    //         routerLink: '/'
    //       },
    //       {
    //         label: ' log out',
    //         icon: 'pi pi-fw pi-sign-out',
    //         command: () => {
    //           this.header.showLogout();
    //         }
    //       }
    //     ]
    //   }
    //
    // ]

  }


  triggerAnimation(outlet: RouterOutlet) {
    return outlet.activatedRouteData['animation'] || 'firstPage';
  }
}
