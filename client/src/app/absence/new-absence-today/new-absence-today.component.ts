import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AbsenceService } from 'src/app/absence/absence.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-absence-today',
  templateUrl: './new-absence-today.component.html',
  styleUrls: ['./new-absence-today.component.scss']
})
export class NewAbsenceTodayComponent implements OnInit {

  loading: boolean;
  showAnnotations: boolean;
  error: boolean;
  newAbsenceForm = this.formBuilder.group({
    hours: [1, Validators.required],
    type: [0, Validators.required],
    mustExcused: [true, Validators.required],
    annotation: []
  });

  constructor(
    private formBuilder: FormBuilder,
    private absenceService: AbsenceService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  async submitAbsence() {
    this.loading = true;

    this.absenceService.newAbsenceToday(
      this.newAbsenceForm.value.hours,
      this.newAbsenceForm.value.type,
      this.newAbsenceForm.value.mustExcused,
      this.newAbsenceForm.value.annotation
    ).subscribe({
      error: err => {
        this.error = true;
        this.loading = false;
      },
      next: () => {
        this.router.navigate(['/absence']);
      }
    });
  }
}
