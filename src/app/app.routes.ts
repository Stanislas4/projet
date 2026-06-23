import { Routes } from '@angular/router';
import { JusticeForm } from './Justice/justiceforms';
import { OSCForm } from './OSC/oscforms';
import { PoliceForm } from './Police/policeforms';
import { SanteForm } from './Sante/santeforms';
import { Dashboard } from './dashboard/dashboard';
import { JusticeDash } from './dashboard/pages/justice-dash/justice-dash';
import { OscDash } from './dashboard/pages/oscdash/oscdash';
import { SanteDash } from './dashboard/pages/sante-dash/sante-dash';
import { PoliceDash } from './dashboard/pages/police-dash/police-dash';
import { Home } from './dashboard/home/home';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'justice', component: JusticeForm},
  { path: 'osc', component: OSCForm },
  { path: 'police', component: PoliceForm },
  { path: 'sante', component: SanteForm },
  {
    path: 'dashboard',
    component: Dashboard,
    children: [
      { path: '', component: Home },  // Page d'accueil
      { path: 'home', component: Home },
      { path: 'police', component: PoliceDash },
      { path: 'justice', component: JusticeDash },
      { path: 'osc', component: OscDash },
      { path: 'sante', component: SanteDash },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {path: 'dashboard', component: Dashboard},
  //{ path: 'login', loadComponent: () => import('./auth/login.component').then(m => m.LoginComponent) },
  { path: '**', redirectTo: '/dashboard' }
];
