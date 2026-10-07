import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const connected = localStorage.getItem('vbg_connected') === 'true';
  const role = localStorage.getItem('vbg_role');

  if (!connected ||!role) {
    router.navigate(['/login']);
    return false;
  }

  // Si la route demande un role précis (ex: data: {role: 'POLICE'})
  const roleDemande = route.data['role'];
  if (!roleDemande) return true; // page d'accueil, on laisse passer tous les connectés
  if (role === 'ADMIN') return true;
  if (role === roleDemande) return true;

  router.navigate(['/dashboard']);
  return false;
};
