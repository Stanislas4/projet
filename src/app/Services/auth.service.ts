import { Injectable } from '@angular/core';
import { supabase } from '../supabase.client';

@Injectable({ providedIn: 'root' })
export class AuthService {
  async login(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) console.error('Erreur login :', error.message);
  return error;
}

  async logout() {
    await supabase.auth.signOut();
  }

  async getRole(): Promise<string | null> {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return null;
    const { data } = await supabase
      .from('profils')
      .select('role')
      .eq('id', session.user.id)
      .single();
    return data?.role ?? null;
  }
}
