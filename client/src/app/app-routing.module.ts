import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { authRoutes } from 'src/app/authentication/auth-routing';
import { AuthenticationGuard } from 'src/app/authentication/authentication.guard';
import { UserProfileResolver } from 'src/app/user/user-profile.resolver';
import { NewAbsenceComponent } from 'src/app/absence/new-absence/new-absence.component';
import { NewAbsenceTodayComponent } from 'src/app/absence/new-absence-today/new-absence-today.component';
import { NewAbsenceDateComponent } from 'src/app/absence/new-absence-date/new-absence-date.component';
import { AbsenceComponent } from 'src/app/absence/absence.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'absence',
    children: [
      {
        path: '',
        component: AbsenceComponent
      },
      {
        path: 'new',
        component: NewAbsenceComponent
      },
      {
        path: 'new/today',
        component: NewAbsenceTodayComponent
      },
      {
        path: 'new/date',
        component: NewAbsenceDateComponent
      }
    ]
  }
];

const topRoutes: Routes = [
  {
    path: '',
    children: authRoutes
  },
  {
    path: '',
    component: LayoutComponent,
    children: routes,
    resolve: {
      userProfile: UserProfileResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(topRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
