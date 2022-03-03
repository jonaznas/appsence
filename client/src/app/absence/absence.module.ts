import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewAbsenceComponent } from './new-absence/new-absence.component';
import { IconsModule } from 'src/app/layout/icons/icons.module';
import { NewAbsenceTodayComponent } from './new-absence-today/new-absence-today.component';
import { NewAbsenceDateComponent } from './new-absence/new-absence-date/new-absence-date.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NewAbsenceComponent,
    NewAbsenceTodayComponent,
    NewAbsenceDateComponent
  ],
  imports: [
    CommonModule,
    IconsModule,
    RouterModule
  ]
})
export class AbsenceModule { }
