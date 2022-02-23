import { Component, OnInit } from '@angular/core';
import { SupabaseService } from 'src/app/authentication/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-out',
  styleUrls: [],
  template: ``
})
export class SignOutComponent implements OnInit {

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.supabaseService.signOut().then(async () => {
      await this.router.navigate(['/']);
    });
  }

}
