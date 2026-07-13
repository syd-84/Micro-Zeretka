import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Goods } from '../services/goods';

export const productExistsGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const productService = inject(Goods);

  const id = route.paramMap.get('id');

  if (productService.currentGoods().some(el => el.id === id)) {
    return true;
  }

  router.navigate(['/page-404']);
  return false;
};
