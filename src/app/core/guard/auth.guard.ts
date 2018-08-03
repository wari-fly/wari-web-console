import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../data/auth.service';
import { NotifyService } from '../data/notify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
    private notify: NotifyService
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    return this.auth.authInfo$.pipe(
      map(authInfo => authInfo.isLoggedIn()),
      take(1),
      tap(allowed => {
        if (!allowed) {
          this.notify.update('Access denied, You must be logged in!', 'error');
          this.router.navigate(['/wari/login']);
        } else {
          this.notify.update('Access allowed', 'success');
        }
      }), );
  }
}
