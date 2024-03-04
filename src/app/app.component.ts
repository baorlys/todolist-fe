import {Component} from "@angular/core";
import {RouterModule, RouterOutlet} from "@angular/router";
import {HeaderComponent} from "./core/layout/header/header.component";
import {animate, group, query, style, transition, trigger} from "@angular/animations";
import {CommonModule} from "@angular/common";


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

  triggerAnimation(outlet: RouterOutlet) {
    return outlet.activatedRouteData['animation'] || 'firstPage';
  }
}
