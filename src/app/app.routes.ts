import { Routes } from '@angular/router';
import { Admin } from './admin/admin';
import { Product } from './product/product';
import { Page404 } from './page404/page404';
import { productExistsGuard } from './guards/product-exists-guard';
import { SearchPage } from './search-page/search-page';
import { Login } from './login/login';
import { ClientPage } from './client-page/client-page';
import { NotReadyPage } from './not-ready-page/not-ready-page';
import { adminGuard } from './guards/admin-guard';

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
    canActivate: [adminGuard],
  },
  {
    path: 'page-404',
    component: Page404,
  },
  {
    path: 'profile',
    component: NotReadyPage,
  },
  {
    path: '**',
    component: Page404,
  },
];
