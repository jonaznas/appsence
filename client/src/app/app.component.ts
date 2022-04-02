import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { SupabaseService } from 'src/app/authentication/supabase.service';
import { filter, pairwise } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit {

  appLoading: boolean;
  appError: string | null;
  session = this.supabaseService.getSession();

  @ViewChild('loadingAppModal') loadingAppModal: ElementRef;
  @ViewChild('appErrorModal') appErrorModal: ElementRef;

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {
  }

  async ngOnInit() {
    if(!this.session) {
      this.authChangeListener();
    }
  }

  authChangeListener() {
    this.supabaseService.authChanges((event, session) => {
      switch (event) {

        case 'SIGNED_IN': {
          this.loadApp();
          break;
        }

      }
    });
  }

  loadApp() {
    this.appLoading = true;
    this.appError = null;

    this.router.navigate(['/home'])
      .catch(() => {
        this.appLoading = false;
        this.appError = 'Fehler beim laden der App.';
      })
      .then(() => {
        this.appLoading = false;
      });
  }
}
