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

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'justiceform', component: JusticeFormsComponent },
  { path: 'oscform', component: OscFormsComponent },
  { path: 'policeform', component: PoliceFormsComponent },
  { path: 'santeform', component: SanteFormsComponent },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: HomeComponent },  // Page d'accueil
      { path: 'police', component: PoliceDash },
      { path: 'justice', component: JusticeDash },
      { path: 'osc', component: OscDash },
      { path: 'sante', component: SanteDash },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  //{ path: 'login', loadComponent: () => import('./auth/login.component').then(m => m.LoginComponent) },
];
