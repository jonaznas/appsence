import { Component, OnInit } from '@angular/core';
import { AbsenceService } from 'src/app/absence/absence.service';
import { Absence } from 'src/app/absence/absence';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

@Component({
  selector: 'app-absence',
  templateUrl: './absence-history.component.html',
  styleUrls: ['./absence-history.component.scss']
})
export class AbsenceHistoryComponent implements OnInit {

  absenceHistory: any[];
  absences: Absence[];

  constructor(
    private absenceService: AbsenceService
  ) {
  }

  ngOnInit(): void {
    this.absenceService.getLastAbsencesByDays(90)
      .subscribe(absences => {
        this.absences = absences;
        this.absenceHistory = this.groupDates(absences);
        console.log(this.groupDates(absences));
      });
  }

  groupDates(absences: Absence[]) {
    const groupedDates: any = {};
    absences.forEach((absence: Absence) => {
      const dt = new Date(absence.date);
      const year = dt.getFullYear();
      const month = dt.getMonth() + 1;

      const key = `${ year }-${ month }`;
      if (key in groupedDates) {
        groupedDates[key].absences = [...groupedDates[key].absences, absence];
      } else {
        groupedDates[key] = {
          year,
          month,
          absences: [absence]
        };
      }

    });

    return Object.values(groupedDates);
  }

  getMonthName(month: number) {
    return format(
      new Date(0, month - 1),
      'MMMM',
      { locale: de }
    );
  }
}
