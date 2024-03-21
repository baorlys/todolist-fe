import {Component, OnInit} from "@angular/core";
import {Route, Router, RouterModule, RouterOutlet} from "@angular/router";
import {HeaderComponent} from "./core/layout/header/header.component";
import {animate, group, query, style, transition, trigger} from "@angular/animations";
import {CommonModule} from "@angular/common";
import {MatListItem, MatListSubheaderCssMatStyler, MatNavList} from "@angular/material/list";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatDivider} from "@angular/material/divider";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuModule, MatMenuTrigger} from "@angular/material/menu";
import {SidebarModule} from "primeng/sidebar";
import {ButtonModule} from "primeng/button";
import {StorageService} from "./core/service/storage.service";
import {ToastrService} from "ngx-toastr";
import {UserModel} from "./model/Response/user.model";
import {ProjectComponent} from "./feature/project/project.component";
import {TodoListComponent} from "./feature/todo-list/todo-list.component";
import {MatDialog} from "@angular/material/dialog";
import {ProjectCreateComponent} from "./feature/project/project-create/project-create.component";
import {ProjectService} from "./feature/project/service/project.service";
import {SkeletonModule} from "primeng/skeleton";
import Swal from "sweetalert2";
import {getMessaging, getToken} from "firebase/messaging";
import {environment} from "../environments/environment";
import {ShellComponent} from "./share/shell/shell.component";
import {SwUpdate} from "@angular/service-worker";
import {EditorjsComponent} from "./share/editorjs/editorjs.component";
import {TdlLabelComponent} from "./feature/todo-list/tdl-edit/tdl-label/tdl-label.component";
import {ColorPickerModule} from "ngx-color-picker";


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
    ProjectComponent,
    SkeletonModule,
    MatIconButton,
    ShellComponent,
    EditorjsComponent,
    TdlLabelComponent,
    ColorPickerModule
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
  flagDeleteProject: boolean = false;
  todoListComponent!: TodoListComponent;

  triggerAnimation(outlet: RouterOutlet) {
    return outlet.activatedRouteData['animation'] || 'firstPage';
  }

  constructor(private router: Router,
              private storage: StorageService,
              private toastr: ToastrService,
              private dialog: MatDialog,
              private projectService: ProjectService) {
    // if (typeof Worker !== 'undefined') {
    //   // Create a new
    //   const worker = new Worker(new URL('./app.worker', import.meta.url));
    //   worker.onmessage = ({ data }) => {
    //     console.log(`page got message: ${data}`);
    //   };
    //   worker.postMessage('hello');
    // } else {
    //   // Web Workers are not supported in this environment.
    //   // You should add a fallback so that your program still executes correctly.
    // }

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
    this.project = null;
    this.router.navigate(['/todo-list']).then(r => {
      this.todoListComponent.project = null;
      this.todoListComponent.loadTodos();
    });
  }

  chooseProject(project: any) {
    this.project = project;
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
    this.project = null;
    this.router.navigate(['/login']).then(r => r);
  }

  profile() {
    this.page['home'] = false;
    this.page['calendar'] = false;
    this.page['profile'] = true;
    this.router.navigate(['/profile']).then(r => r);
  }

  showLogout() {
    Swal.fire(
      {
        title: "Log out",
        text: "Are you sure you want to log out?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "Yes"
      }
    ).then((result) => {
      if(result.isConfirmed) {
        this.logOut();
      }
    }
    )
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
  deleteProject() {
    Swal.fire(
      {
        title: "Delete project",
        text: "Are you sure you want to delete this project?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "Yes"
      }
    ).then((result) => {
      console.log(result);
      if(result.isConfirmed) {
        this.projectService.delete(this.project.id).subscribe(
          {
            next: data => {
              this.flagDeleteProject = true;
              this.showSuccess(this.project, 'Delete success!', 'has been deleted!');
            },
            error: err => {
              console.log(err);
              this.showFail( this.project, 'Delete failed!', 'has not been deleted!');
            }
          })
      }
    }
    )
  }

  showSuccess(data: any, title: string, message: string) {
    this.toastr.success(data.title + ' ' + message, title);
  }

  showFail(data: any, title: string, message: string) {
    this.toastr.error(data.title + ' ' + message, title);
  }
}
