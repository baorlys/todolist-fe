import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MatDrawer, MatDrawerContainer, MatSidenavModule} from "@angular/material/sidenav";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {ProjectModel} from "../../model/Response/project.model";
import {StorageService} from "../../core/service/storage.service";
import {ProjectService} from "./service/project.service";
import {DatePipe, NgClass} from "@angular/common";

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatDrawerContainer,
    MatDrawer,
    MatNavList,
    MatListItem,
    MatIcon,
    DatePipe,
    NgClass
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnChanges {
  projectList: any[] = [];
  user: any;
  @Output()
  project = new EventEmitter<ProjectModel>()
  @Input()
  clickOtherPageEvent !: Boolean;
  @Input()
  projectAddEvent !: Boolean;

  constructor(
    private storageService: StorageService,
    private projectService: ProjectService
  ) {
    this.user = storageService.getItem('user');
    this.loadProjects()
  }

  loadProjects() {
    this.projectList = [];
    this.projectService.getAll(this.user.id).subscribe((data) => {

      // @ts-ignore
      for (let project of data) {
        project.isActive = false;
        this.projectList.push(project);
      }

    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.projectAddEvent){
      this.loadProjects();
      this.projectAddEvent = false;
    }
    if (this.clickOtherPageEvent) {
      this.projectList.forEach((p) => {
        p.isActive = false;
      });
    }
  }



  selectProject(project: any) {
    this.projectList.forEach((p) => {
      p.isActive = false;
    });
    project.isActive = true;
    this.project.emit(project);
  }



}
