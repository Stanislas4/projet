import { Component } from '@angular/core';
import { supabase } from '../supabase.client';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  code = '';
  message = '';
  constructor(private router: Router) {}

  async valider() {
    const { data, error } = await supabase.from('codes_acces').select('*').eq('code_secret', this.code.trim()).single();
    if (error ||!data) { this.message = 'Code invalide'; return; }

    // C'est ça qui "enregistre le lien sur l'ordi de l'entité"
    localStorage.setItem('vbg_role', data.role);
    localStorage.setItem('vbg_entite', data.entite);

    this.router.navigate(['/' + data.role.toLowerCase()]);
  }
}

