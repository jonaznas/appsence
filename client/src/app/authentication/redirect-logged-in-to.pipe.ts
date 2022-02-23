import { Pipe, PipeTransform } from '@angular/core';
import { SupabaseService } from 'src/app/authentication/supabase.service';
import { Router } from '@angular/router';

@Pipe({
  name: 'redirectLoggedInTo'
})
export class RedirectLoggedInToPipe implements PipeTransform {

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {
  }

  async transform(): Promise<void> {
    const session = this.supabaseService.getSession();

    if (session) {
      await this.router.navigate(['/home']);
    }
  }
}
