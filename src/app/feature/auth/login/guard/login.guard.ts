import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../../service/auth.service";
import {inject} from "@angular/core";

export const loginGuard: CanActivateFn = (route, state) => {
  if(inject(AuthService).isAuthenticated()) {
    inject(Router).navigate(['/todo-list']).then(r => console.log(r) )
    return false;
  }
  return true;
};
