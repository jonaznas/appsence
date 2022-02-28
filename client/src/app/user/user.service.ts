import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserProfileDto } from 'src/app/user/user-profile-dto';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) {
  }

  public getUserProfile(): Observable<UserProfileDto | null> {
    return this.http
      .get<UserProfileDto>(environment.endpoint.userProfile)
      .pipe(
        catchError(async () => null)
      );
  }
}
