import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { LayoutModule } from 'src/app/layout/layout.module';
import { HomeModule } from 'src/app/home/home.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { IconsModule } from 'src/app/layout/icons/icons.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationModule } from 'src/app/authentication/authentication.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    LayoutModule,
    HomeModule,
    IconsModule,
    AuthenticationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
