import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(
    private http: HttpClient
  ) {
  }

  public getHoursByDays(days: number): Observable<any> {
    return this.http.get(environment.endpoint.statistic.hoursByDays, {
      params: {
        days: days
      }
    });
  }

  public getAllHours(): Observable<any> {
    return this.http.get(environment.endpoint.statistic.allHours);
  }

  public getYearHours(): Observable<any> {
    return this.http.get(environment.endpoint.statistic.yearHours);
  }
}
