import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  constructor(
    private http: HttpClient
  ) {
  }

  public newAbsenceToday(hours: number, type: number, mustExcused: boolean, annotation?: string): Observable<any> {
    return this.http.post(environment.endpoint.absence.newAbsenceToday, {
      hours, type, mustExcused, annotation
    });
  }
}
