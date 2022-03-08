import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbsenceService } from 'src/app/absence/absence.service';
import { Absence } from 'src/app/absence/absence';

@Component({
  selector: 'app-view-absence',
  templateUrl: './view-absence.component.html',
  styleUrls: ['./view-absence.component.scss']
})
export class ViewAbsenceComponent implements OnInit {

  absences: Absence[];
  date: Date;

  constructor(
    private route: ActivatedRoute,
    private absenceService: AbsenceService,
    private router: Router
  ) {
  }

  async ngOnInit(): Promise<void> {
    const dateParam = this.route.snapshot.paramMap.get('date') || '';
    const date = new Date(dateParam);

    if (isNaN(date.getHours())) {
      await this.router.navigate(['/absence']);
      return;
    }

    this.date = date;

    this.absenceService.getAbsencesForDate(date).subscribe(absences => {
      this.absences = absences;
    });
  }

}
