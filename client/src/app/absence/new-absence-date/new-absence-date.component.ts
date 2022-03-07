import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
  }

  submitAbsence() {
    this.loading = true;
  }
}
