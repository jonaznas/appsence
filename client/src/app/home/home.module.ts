import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { IconsModule } from 'src/app/layout/icons/icons.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    IconsModule,
    RouterModule
  ]
})
export class HomeModule { }
