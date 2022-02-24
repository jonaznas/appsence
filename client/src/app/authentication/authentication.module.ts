import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignOutComponent } from './sign-out/sign-out.component';
import { IconsModule } from 'src/app/layout/icons/icons.module';

@NgModule({
  declarations: [
    SignInComponent,
    SignOutComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IconsModule
  ]
})
export class AuthenticationModule { }
