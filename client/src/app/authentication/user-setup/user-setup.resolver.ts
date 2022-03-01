import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSetupResolver implements Resolve<object> {

  constructor(
    private router: Router
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<object> {
    const currentNavigation = this.router.getCurrentNavigation();

    return of({
      profileIsFinished: currentNavigation?.extras.state?.['profileIsFinished']
    });
  }
}
