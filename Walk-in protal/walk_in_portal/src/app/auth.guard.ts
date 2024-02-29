import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ApiRequestsService } from './services/APIService/api-requests.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private apiRequestsService: ApiRequestsService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!localStorage.getItem('userData')?.length) {
      this.router.navigate(['/login']);
      return false;
    }
    this.apiRequestsService.loginByTokenRequest().subscribe(
      (data) => {
        return true;
      },
      (error) => {
        console.log(error);

        localStorage.removeItem('userData');
        this.router.navigate(['/login']);
        return true;
      }
    );
    return true;
  }
}
