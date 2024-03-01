import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../../feature/auth/service/auth.service";
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (
  route,
  stat) => {
  if(inject(AuthService).isAuthenticated()) {
    return true;
  } else {
    inject(Router).navigate(['/login']).then(r => r)
    return false;
  }
};



