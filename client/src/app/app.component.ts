import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/authentication/supabase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit {

  session = this.supabaseService.getSession();

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {
  }

  async ngOnInit() {
    this.supabaseService.authChanges((event, session) => {
      switch (event) {

        case 'SIGNED_IN': {
          this.router.navigate(['/home']);
          break;
        }

      }
    });
  }
}
