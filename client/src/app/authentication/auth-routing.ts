import { Routes } from '@angular/router';
import { SignInComponent } from 'src/app/authentication/sign-in/sign-in.component';
import { SignOutComponent } from 'src/app/authentication/sign-out/sign-out.component';
import { UserSetupComponent } from 'src/app/authentication/user-setup/user-setup.component';

export const authRoutes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'sign-out',
    component: SignOutComponent
  },
  {
    path: 'setup',
    component: UserSetupComponent
  },
  {
    path: '',
    redirectTo: '/sign-in',
    pathMatch: 'full'
  }
];
