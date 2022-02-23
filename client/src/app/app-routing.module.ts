import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { authRoutes } from 'src/app/authentication/auth-routing';
import { AuthenticationGuard } from 'src/app/authentication/authentication.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthenticationGuard]
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
    children: routes
  }
];

@NgModule({
  imports: [RouterModule.forRoot(topRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
