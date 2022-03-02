import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewAbsenceComponent } from './new-absence/new-absence.component';
import { IconsModule } from 'src/app/layout/icons/icons.module';

@NgModule({
  declarations: [
    NewAbsenceComponent
  ],
  imports: [
    CommonModule,
    IconsModule
  ]
})
export class AbsenceModule { }
