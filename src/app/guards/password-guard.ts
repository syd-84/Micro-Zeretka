import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ConfirmPassword } from '../services/confirm-password';

export const passGuard: CanActivateFn = (route, state) => {
  const passService = inject(ConfirmPassword);
  const router = inject(Router);

  if (passService.password() === 'admin') {
    return true;
  }

  passService.passwordReset();
  router.navigate(['/page-404']);
  return false;
};