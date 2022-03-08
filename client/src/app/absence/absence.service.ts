import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';

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

  public newAbsenceDate(hours: number, type: number, date: string, mustExcused: boolean, annotation?: string) {
    return this.http.post(environment.endpoint.absence.newAbsenceDate, {
      hours, type, date, mustExcused, annotation
    });
  }

  public getAbsencesForDate(date: Date): Observable<any> {
    return this.http.get(environment.endpoint.absence.getAbsencesForDate, {
      params: {
        date: date.toISOString().split('T')[0]
      }
    });
  }

  public getLastAbsences(limit: number): Observable<any> {
    return this.http.get(environment.endpoint.absence.getAbsenceHistoryByDays, {
      params: {
        limit
      }
    }).pipe(
      map((absences: any) => {
        return absences.map((absence: any) => {
          return {
            id: absence.id,
            date: new Date(absence.date),
            hours: absence.hours,
            type: absence.type,
            mustExcused: absence.mustExcused,
            isExcused: absence.isExcused,
            annotation: absence.annotation
          };
        });
      })
    );
  }

  public updateAbsence(id: number, isExcused: boolean) {
    return this.http.put(environment.endpoint.absence.updateAbsence, {
      id, isExcused
    });
  }
}
