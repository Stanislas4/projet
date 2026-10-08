import { Routes } from '@angular/router';
import { JusticeDash } from './pages/justice-dash/justice-dash';
import { OscDash } from './pages/oscdash/oscdash';
import { SanteDash } from './pages/sante-dash/sante-dash';
import { PoliceDash } from './pages/police-dash/police-dash';
import { HomeComponent } from './pages/home/home.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { PoliceFormsComponent } from './pages/police-forms/police-forms.component';
import { SanteFormsComponent } from './pages/sante-forms/sante-forms.component';
import { JusticeFormsComponent } from './pages/justice-forms/justice-forms.component';
import { OscFormsComponent } from './pages/osc-forms/osc-forms.component';
import { roleGuard } from './guards/role.guard';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  // Formulaires : un par entité
  { path: 'policeform',  component: PoliceFormsComponent,  canActivate: [roleGuard], data: { role: 'POLICE' } },
  { path: 'santeform',   component: SanteFormsComponent,   canActivate: [roleGuard], data: { role: 'SANTE' } },
  { path: 'justiceform', component: JusticeFormsComponent, canActivate: [roleGuard], data: { role: 'JUSTICE' } },
  { path: 'oscform',     component: OscFormsComponent,     canActivate: [roleGuard], data: { role: 'OSC' } },

  // Dashboards : tout utilisateur connecté peut entrer
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [roleGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'police', component: PoliceDash },
      { path: 'justice', component: JusticeDash },
      { path: 'osc', component: OscDash },
      { path: 'sante', component: SanteDash },
      { path: 'admin', component: HomeComponent, canActivate: [roleGuard], data: { role: 'ADMIN' } },
    ]
  },

  { path: '**', redirectTo: '/dashboard' }
];
