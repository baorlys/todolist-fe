import {
  AfterContentInit,
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../feature/auth/service/auth.service";
import {StorageService} from "../../service/storage.service";
import {MenubarModule} from "primeng/menubar";
import { MenuItem } from 'primeng/api';
import {ToastrService} from "ngx-toastr";
import {AppService} from "../../service/app.service";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIconButton} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {emit} from "@angular-devkit/build-angular/src/tools/esbuild/angular/compilation/parallel-worker";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MenubarModule,
    MatToolbar,
    MatIconButton,
    MatIconModule,
    MatSlideToggle,
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent{

  user: any;
  items: MenuItem[] | undefined;
  @Output()
  homePageEvent = new EventEmitter();
  enableNotification: any;

  constructor(
    private router : Router,
  )
  {}
  homePage() {
    this.homePageEvent.emit();
    this.router.navigate(['/']).then(r => r);
  }
}

export interface User {
  username: string;
  email: string;
}
