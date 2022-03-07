import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AbsenceService } from 'src/app/absence/absence.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-absence-date',
  templateUrl: './new-absence-date.component.html',
  styleUrls: ['./new-absence-date.component.scss']
})
export class NewAbsenceDateComponent implements OnInit {

  loading: boolean;
  showAnnotations: boolean;
  error: string | null;
  newAbsenceForm = this.formBuilder.group({
    hours: [1, Validators.required],
    type: [0, Validators.required],
    date: ['', Validators.required],
    mustExcused: [true, Validators.required],
    annotation: []
  });

  @ViewChild('datePicker') datePicker: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private absenceService: AbsenceService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  triggerDatePicker() {
    this.datePicker.nativeElement.showPicker();
  }

  async submitAbsence() {
    this.loading = true;

    this.absenceService.newAbsenceDate(
      this.newAbsenceForm.value.hours,
      this.newAbsenceForm.value.type,
      this.newAbsenceForm.value.date,
      this.newAbsenceForm.value.mustExcused,
      this.newAbsenceForm.value.annotation
    ).subscribe({
      error: err => {
        this.error = err.error;
        this.loading = false;
      },
      next: () => {
        this.router.navigate(['/absence']);
      }
    });
  }
}
