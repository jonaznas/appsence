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

  public getProfile(): PromiseLike<any> {
    const user = this.getUser();

    return this.supabaseClient.from('profiles')
      .select('username, avatar_url')
      .eq('id', user?.id)
      .single();
  }

  public authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabaseClient.auth.onAuthStateChange(callback);
  }

  public signIn(email: string): Promise<any> {
    return this.supabaseClient.auth.signIn({ email });
  }

  public signOut(): Promise<any> {
    return this.supabaseClient.auth.signOut();
  }
}
