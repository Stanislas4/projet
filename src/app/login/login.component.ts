import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../Services/auth.service';
import { StorageService } from '../Services/storage';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  message = '';
  loading = false;

  constructor(
    private router: Router,
    private auth: AuthService,
    private storage: StorageService
  ) {}

  async seConnecter() {
    if (!this.email || !this.password) {
      this.message = 'Remplis les deux champs';
      return;
    }
    this.loading = true;
    this.message = '';

    const error = await this.auth.login(this.email.trim(), this.password);
    if (error) {
      this.loading = false;
      this.message = 'Identifiants invalides';
      return;
    }

    const role = await this.auth.getRole();
    if (!role) {
      this.loading = false;
      this.message = "Compte sans rôle, contacte l'administrateur";
      return;
    }

    // Recharge les dossiers maintenant que l'utilisateur est connecté
    await this.storage.charger();
    this.loading = false;

    this.router.navigate([role === 'ADMIN' ? '/dashboard' : `/${role.toLowerCase()}form`]);
  }
}
