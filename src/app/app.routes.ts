import { Routes } from '@angular/router';
import { Admin } from './admin/admin';
import { Product } from './product/product';
import { Page404 } from './page404/page404';
import { productExistsGuard } from './guards/product-exists-guard';
import { SearchPage } from './search-page/search-page';
import { Login } from './login/login';
import { passGuard } from './guards/password-guard';
import { ClientPage } from './client-page/client-page';
import { Cart } from './pages/cart/cart';

export const routes: Routes = [
  {
    path: '',
    component: ClientPage,
  },
  {
    path: 'product/:id',
    component: Product,
    canActivate: [productExistsGuard],
  },
  {
    path: 'search',
    component: SearchPage,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'admin',
    component: Admin,
    canActivate: [passGuard],
  },
  {
    path: 'page-404',
    component: Page404,
  },
  {
    path: '**',
    component: Page404,
  },
];
