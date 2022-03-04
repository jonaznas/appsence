import { Component, OnInit } from '@angular/core';
import { AbsenceService } from 'src/app/absence/absence.service';
import { Absence } from 'src/app/absence/absence';

@Component({
  selector: 'app-absence',
  templateUrl: './absence-history.component.html',
  styleUrls: ['./absence-history.component.scss']
})
export class AbsenceHistoryComponent implements OnInit {

  absences: Absence[];

  constructor(
    private absenceService: AbsenceService
  ) {
  }

  ngOnInit(): void {
    this.absenceService.getLastAbsencesByDays(90)
      .subscribe(absences => {
        this.absences = absences;
        console.log(this.absences);
      });
  }
}
