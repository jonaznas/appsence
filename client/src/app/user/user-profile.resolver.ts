import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user/user.service';
import { UserProfileDto } from 'src/app/user/user-profile-dto';

@Injectable({
  providedIn: 'root'
})
export class UserProfileResolver implements Resolve<UserProfileDto | null> {

  constructor(
    private userService: UserService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserProfileDto | null> {
    return this.userService.getUserProfile();
  }
}
