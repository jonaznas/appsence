import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('tooManyRequestsModal') tooManyRequestsModal: ElementRef;
  @ViewChild('emailSentModal') emailSentModal: ElementRef;

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

  signInEmail(): void {
    this.loading = true;
    this.supabaseService.signInEmail(this.signInForm.value.email)
      .then(response => {
        this.loading = false;

        if (response.error) {
          this.tooManyRequestsModal.nativeElement.checked = true;
        } else {
          this.emailSentModal.nativeElement.checked = true;
        }
      });
  }

  signInGoogle(): void {
    this.loading = true;
    this.supabaseService.signInGoogle()
      .then(() => {
        this.loading = false;
      });
  }
}
