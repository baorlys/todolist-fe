import {Component, OnInit} from "@angular/core";
import {Route, Router, RouterModule, RouterOutlet} from "@angular/router";
import {HeaderComponent} from "./core/layout/header/header.component";
import {animate, group, query, style, transition, trigger} from "@angular/animations";
import {CommonModule} from "@angular/common";
import {MatListItem, MatListSubheaderCssMatStyler, MatNavList} from "@angular/material/list";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatDivider} from "@angular/material/divider";
import {MatButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuModule, MatMenuTrigger} from "@angular/material/menu";
import {SidebarModule} from "primeng/sidebar";
import {ButtonModule} from "primeng/button";
import {switchAll} from "rxjs";
import {StorageService} from "./core/service/storage.service";
import {ToastrService} from "ngx-toastr";
import {UserModel} from "./model/Response/user.model";
import {ProjectComponent} from "./feature/project/project.component";
import {TodoListComponent} from "./feature/todo-list/todo-list.component";
import {TdlAddComponent} from "./feature/todo-list/tdl-add/tdl-add.component";
import {MatDialog} from "@angular/material/dialog";
import {ProjectCreateComponent} from "./feature/project/project-create/project-create.component";
import {ProjectService} from "./feature/project/service/project.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    CommonModule,
    MatListItem,
    MatNavList,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatIconModule,
    MatDivider,
    MatButton,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    MatMenuModule,
    SidebarModule,
    ButtonModule,
    MatListSubheaderCssMatStyler,
    ProjectComponent
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
export class AppComponent implements OnInit{
  isActive: boolean = true;
  isLogged: boolean = false;
  user!: UserModel;

  page : {[key: string]: boolean} = {
    home: true,
    calendar: false,
    profile: false,
  }
  project : any;
  flagAddProject: boolean = false;
  todoListComponent!: TodoListComponent;

  triggerAnimation(outlet: RouterOutlet) {
    return outlet.activatedRouteData['animation'] || 'firstPage';
  }

  constructor(private router: Router,
              private storage: StorageService,
              private toastr: ToastrService,
              private dialog: MatDialog,
              private projectService: ProjectService) {

  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (this.storage.getItem('user') != undefined) {
        this.isLogged = true;
        this.user = this.storage.getItem('user');
      }
    });
  }


  home() {
    this.page['home'] = true;
    this.page['calendar'] = false;
    this.page['profile'] = false;
    this.router.navigate(['/todo-list']).then(r => {
      this.todoListComponent.project = null;
      this.todoListComponent.loadTodos();
    });
  }

  chooseProject(project: any) {
    this.page['home'] = false;
    this.page['calendar'] = false;
    this.page['profile'] = false;
    this.router.navigate(['/todo-list']).then(r => {
      this.todoListComponent.project = project;
      this.todoListComponent.loadTodos();
    });
  }


  logOut() {
    this.storage.removeItem('user')
    this.storage.removeItem('jwtToken')
    this.isLogged = false;
    this.router.navigate(['/login']).then(r => r);
  }

  profile() {
    this.page['home'] = false;
    this.page['calendar'] = false;
    this.page['profile'] = true;
    this.router.navigate(['/profile']).then(r => r);
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


  getTodoComponent(todoListComponent: TodoListComponent) {
    this.todoListComponent = todoListComponent;
  }

  createProject() {
    this.dialog.open(ProjectCreateComponent, {
      width: '500px',
      disableClose: true
    }).afterClosed().subscribe(result => {
      if(result.event === 'confirm') {
        this.projectService.create(result.data).subscribe(
          {
            next: data => {
              this.flagAddProject = true;
              this.showSuccess( result.data, 'Create success!', 'has been created!');
            },
            error: err => {
              console.log(err);
              this.showFail( result.data, 'Create failed!', 'has not been created!');
            }
          })
      }
    })
  }
  showSuccess(data: any, title: string, message: string) {
    this.toastr.success(data.title + ' ' + message, title);
  }

  showFail(data: any, title: string, message: string) {
    this.toastr.error(data.title + ' ' + message, title);
  }
}
