import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewAbsenceComponent } from './new-absence/new-absence.component';
import { IconsModule } from 'src/app/layout/icons/icons.module';
import { NewAbsenceTodayComponent } from './new-absence-today/new-absence-today.component';
import { NewAbsenceDateComponent } from './new-absence-date/new-absence-date.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AbsenceHistoryComponent } from 'src/app/absence/absence-history/absence-history.component';
import { FormatDistanceToNowPipeModule } from 'ngx-date-fns';
import { AbsenceHistoryItemComponent } from './absence-history/absence-history-item/absence-history-item.component';

@NgModule({
  declarations: [
    NewAbsenceComponent,
    NewAbsenceTodayComponent,
    NewAbsenceDateComponent,
    AbsenceHistoryComponent,
    AbsenceHistoryItemComponent
  ],
  imports: [
    CommonModule,
    IconsModule,
    RouterModule,
    ReactiveFormsModule,
    FormatDistanceToNowPipeModule
  ]
})
export class AbsenceModule { }
