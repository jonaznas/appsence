import { Routes } from '@angular/router';
import { SignInComponent } from 'src/app/authentication/sign-in/sign-in.component';
import { RedirectLoggedInToPipe } from 'src/app/authentication/redirect-logged-in-to.pipe';

export const authRoutes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent,
    data: {
      redirectLoggedIn: RedirectLoggedInToPipe
    }
  },
  {
    path: '',
    redirectTo: '/sign-in',
    pathMatch: 'full'
  }
];
