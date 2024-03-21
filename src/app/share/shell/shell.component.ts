import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {WebWorkerService} from "../../core/service/worker/web-worker.service";
import {ButtonModule} from "primeng/button";
import {MessagesModule} from "primeng/messages";

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    ButtonModule,
    MessagesModule
  ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css'
})
export class ShellComponent implements OnInit, OnDestroy {

  isNewAppVersionAvailable: boolean = false;
  newAppUpdateAvailableSubscription!: Subscription;


  constructor(
    private webServiceWorker: WebWorkerService,
  ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.checkIfAppUpdated();
  }

  checkIfAppUpdated() {
    this.newAppUpdateAvailableSubscription = this.webServiceWorker.$isAnyNewUpdateAvailable.subscribe((versionAvailableFlag: boolean) => {
      this.isNewAppVersionAvailable = versionAvailableFlag;
    });
  }

  refreshApp() {
    window.location.reload();
  }

  ngOnDestroy() {
    this.newAppUpdateAvailableSubscription?.unsubscribe();
  }
}
