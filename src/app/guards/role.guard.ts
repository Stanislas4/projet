import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../Services/auth.service';

export const roleGuard: CanActivateFn = async (route: ActivatedRouteSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const role = await auth.getRole();

  if (!role) return router.createUrlTree(['/login']);

  const demande = route.data['role'];
  if (!demande || role === 'ADMIN' || role === demande) return true;

  return router.createUrlTree(['/dashboard']);
};
