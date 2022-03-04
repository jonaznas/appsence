import { Component, OnInit } from '@angular/core';
import { AbsenceService } from 'src/app/absence/absence.service';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.scss']
})
export class AbsenceComponent implements OnInit {

  constructor(
    private absenceService: AbsenceService
  ) {
  }

  ngOnInit(): void {
    this.absenceService.getAbsencesForDate(new Date())
      .subscribe(absences => {
        console.log(absences);
      });
  }
}
