import { Injectable } from '@angular/core';
import { AuthChangeEvent, createClient, Session, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

export interface UserProfile {
  name: string,
  email: string,
  avatarUrl: string
}

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private supabaseClient: SupabaseClient;

  constructor() {
    this.supabaseClient = createClient(environment.supabase.url, environment.supabase.key);
  }

  public getUser(): User | null {
    return this.supabaseClient.auth.user();
  }

  public getSession(): Session | null {
    return this.supabaseClient.auth.session();
  }

  public authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabaseClient.auth.onAuthStateChange(callback);
  }

  public signInEmail(email: string): Promise<any> {
    return this.supabaseClient.auth.signIn(
      { email },
      { redirectTo: environment.appUrl + '?ref=auth' }
    );
  }

  public signInGoogle(): Promise<any> {
    return this.supabaseClient.auth.signIn(
      { provider: 'google' },
      { redirectTo: environment.appUrl + '?ref=auth' }
    );
  }

  public signOut(): Promise<any> {
    return this.supabaseClient.auth.signOut();
  }
}
