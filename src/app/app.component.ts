import {Component} from "@angular/core";
import {Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet} from "@angular/router";
import {HeaderComponent} from "./core/layout/header/header.component";
import {animate, group, query, style, transition, trigger} from "@angular/animations";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app.routes";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    CommonModule,
    // AppRoutingModule,
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

  triggerAnimation(outlet: RouterOutlet) {
    return outlet.activatedRouteData['animation'] || 'firstPage';
  }
}
