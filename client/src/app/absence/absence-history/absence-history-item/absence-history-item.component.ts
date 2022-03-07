import { Component, Input, OnInit } from '@angular/core';
import { Absence } from 'src/app/absence/absence';
import { formatDistanceToNow, isToday } from 'date-fns';
import { de } from 'date-fns/locale';
import { AbsenceService } from 'src/app/absence/absence.service';

@Component({
  selector: 'app-absence-history-item',
  templateUrl: './absence-history-item.component.html',
  styleUrls: ['./absence-history-item.component.scss']
})
export class AbsenceHistoryItemComponent implements OnInit {

  loading: boolean;

  @Input() absence: Absence;

  constructor(
    private absenceService: AbsenceService
  ) {
  }

  ngOnInit(): void {
  }

  toggleCollapse(e: MouseEvent) {
    const target = e.target as HTMLElement;
    const collapse = target.closest('.collapse');
    if (collapse) {
      collapse.classList.toggle('collapse-open');
    }
  }

  printDistanceToNow(dateString: string) {
    const date = new Date(dateString);

    if (isToday((date))) {
      return 'Heute';
    }

    return formatDistanceToNow(date, {
      locale: de,
      addSuffix: true
    });
  }

  updateAbsence(id: number, isExcused: boolean) {
    this.loading = true;
    this.absenceService.updateAbsence(id, isExcused)
      .subscribe({
        next: () => {
          this.absence.isExcused = isExcused;
          this.loading = false;
        }
      });
  }
}
