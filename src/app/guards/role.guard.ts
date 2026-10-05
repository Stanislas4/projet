import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route) => {
  const router = inject(Router);
  const role = localStorage.getItem('vbg_role');

  if (!role) {
    router.navigate(['/login']);
    return false;
  }

  const attendu = route.data?.['role'];
  // ADMIN peut tout voir
  if (role === 'ADMIN') return true;
  // Les autres voient seulement leur lien
  if (role === attendu) return true;
  // Si dashboard parent sans role précis, on laisse passer pour checker les enfants
  if (!attendu) return true;

  router.navigate(['/login']);
  return false;
};
