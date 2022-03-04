import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewAbsenceComponent } from './new-absence/new-absence.component';
import { IconsModule } from 'src/app/layout/icons/icons.module';
import { NewAbsenceTodayComponent } from './new-absence-today/new-absence-today.component';
import { NewAbsenceDateComponent } from './new-absence-date/new-absence-date.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AbsenceHistoryComponent } from 'src/app/absence/absence-history/absence-history.component';

@NgModule({
  declarations: [
    NewAbsenceComponent,
    NewAbsenceTodayComponent,
    NewAbsenceDateComponent,
    AbsenceHistoryComponent
  ],
  imports: [
    CommonModule,
    IconsModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class AbsenceModule { }
