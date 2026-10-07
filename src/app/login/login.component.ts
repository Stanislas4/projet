import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { supabase } from '../supabase.client';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  code = '';
  message = '';
  loading = false;

  constructor(private router: Router) {}

  async seConnecter() {
    if(!this.code) { this.message = "Entre un code"; return; }
    this.loading = true;
    this.message = '';

    const { data, error } = await supabase
      .from('codes_acces')
      .select('role')
      .eq('code_secret', this.code.trim().toUpperCase())
      .single();

    this.loading = false;

    if (data?.role) {
      localStorage.setItem('role', data.role);
      localStorage.setItem('isLogged', 'true'); // pour ton guard
      this.router.navigate([`/${data.role.toLowerCase()}`]);
    } else {
      this.message = "Code invalide";
    }
  }
}
