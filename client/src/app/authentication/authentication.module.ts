import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignOutComponent } from './sign-out/sign-out.component';
import { IconsModule } from 'src/app/layout/icons/icons.module';
import { UserSetupComponent } from './user-setup/user-setup.component';

@NgModule({
  declarations: [
    SignInComponent,
    SignOutComponent,
    UserSetupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IconsModule
  ]
})
export class AuthenticationModule { }
