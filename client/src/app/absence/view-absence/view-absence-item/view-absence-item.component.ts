import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Absence } from 'src/app/absence/absence';
import { FormBuilder, Validators } from '@angular/forms';
import { AbsenceService } from 'src/app/absence/absence.service';

@Component({
  selector: 'app-view-absence-item',
  templateUrl: './view-absence-item.component.html',
  styleUrls: ['./view-absence-item.component.scss']
})
export class ViewAbsenceItemComponent implements OnInit {

  loading: boolean;
  hideAbsence: boolean;
  showDeleteConfirmation: boolean;
  absenceForm = this.formBuilder.group({
    type: [null, Validators.required],
    mustExcused: [null, Validators.required]
  });

  @Input() absence: Absence;
  @ViewChild('saveButton') saveButton: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private absenceService: AbsenceService
  ) {
  }

  ngOnInit(): void {
    this.absenceForm.setValue({
      type: this.absence.type,
      mustExcused: this.absence.mustExcused
    });
  }

  updateAbsence() {
    this.loading = true;

    this.absenceService.updateAbsence(
      this.absence.id,
      this.absence.isExcused,
      this.absenceForm.value.type,
      this.absenceForm.value.mustExcused,
      null
    ).subscribe({
      next: () => {
        this.showSaveFeedback('btn-success');
        this.loading = false;
      }
    });
  }

  deleteAbsence() {
    this.loading = true;

    this.absenceService.deleteAbsence(this.absence.id).subscribe({
      next: () => {
        this.loading = false;
        this.hideAbsence = true;
      }
    });
  }

  showSaveFeedback(feedback: string) {
    this.saveButton.nativeElement.classList.add(feedback);
    this.saveButton.nativeElement.classList.add('btn-outline');
    this.saveButton.nativeElement.textContent = 'Wurde gespeichert';

    setTimeout(() => {
      this.saveButton.nativeElement.classList.remove(feedback);
      this.saveButton.nativeElement.classList.remove('btn-outline');
      this.saveButton.nativeElement.textContent = 'Speichern';
    }, 4000);
  }
}
