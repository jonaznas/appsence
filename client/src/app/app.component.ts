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
    private router: Router,
    private route: ActivatedRoute
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
          console.log('Signed in');
          this.loadApp();
          break;
        }

      }
    });
  }

  loadApp() {
    this.appLoading = true;
    this.appError = null;

    /*const queryParams = this.route.snapshot.queryParams as any;
    this.router.events
      .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
      .subscribe((events: RoutesRecognized[]) => {
        console.log('previous url', events[0].urlAfterRedirects);
        console.log('current url', events[1].urlAfterRedirects);
      });*/

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
