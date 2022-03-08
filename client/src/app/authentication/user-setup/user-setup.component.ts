import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { SupabaseService } from 'src/app/authentication/supabase.service';

@Component({
  selector: 'app-user-setup',
  templateUrl: './user-setup.component.html',
  styleUrls: ['./user-setup.component.scss']
})
export class UserSetupComponent implements OnInit {

  loading: boolean;
  error: string | null;

  setupForm = this.formBuilder.group({
    name: ['', Validators.pattern('^[A-z0-9_-]{3,15}$')]
  }, {
    updateOn: 'submit'
  });

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private supabaseService: SupabaseService
  ) {
  }

  async ngOnInit(): Promise<void> {
    const setupData = this.route.snapshot.data['setup'];

    if (setupData.profileIsFinished) {
      await this.router.navigate(['/home']);
    }
  }

  async finishSetup() {
    const user = this.supabaseService.getUser();
    this.loading = true;
    this.error = null;

    if (!this.setupForm.valid) {
      this.loading = false;
      this.error = 'Der Name ist ungültig.';
      return;
    }

    if (!user?.id) {
      return;
    }

    this.userService.createUserProfile({
      id: user.id,
      name: this.setupForm.value.name
    }).subscribe({
        error: err => {
          this.loading = false;
          this.error = err;
        },
        next: () => this.router.navigate(['/home'])
      }
    );
  }
}
