import { Component, OnInit } from '@angular/core';
import { SupabaseService, UserProfile } from 'src/app/authentication/supabase.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  loading: boolean;
  user: UserProfile;

  signInForm = this.formBuilder.group({
    email: ['']
  });

  constructor(
    private router: Router,
    private supabaseService: SupabaseService,
    private formBuilder: FormBuilder
  ) {
    this.loading = false;
    this.user = {} as UserProfile;
  }

  ngOnInit(): void {
  }

  signIn(): void {
    this.loading = true;
    this.supabaseService.signIn(this.signInForm.value.email)
      .then(() => {
        this.loading = false;
        console.log('signed in');
      });
  }
}
