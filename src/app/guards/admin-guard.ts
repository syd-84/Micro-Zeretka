import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Users } from '../services/users';

export const adminGuard: CanActivateFn = (route, state) => {
  const userService = inject(Users);
  const router = inject(Router);

  if (userService.user()?.role === 'admin') {
    return true;
  }

  router.navigate(['/page-404']);
  return false;
};
