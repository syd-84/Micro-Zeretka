import { Routes } from '@angular/router';
import { Admin } from './admin/admin';
import { Product } from './product/product';
import { Page404 } from './page404/page404';
import { productExistsGuard } from './product-exists-guard';
import { SearchPage } from './search-page/search-page';
import { Login } from './login/login';

export const routes: Routes = [
  {
    path: "",
    component: Admin
  },
  {
    path: "item/:id",
    component: Product,
    canActivate: [productExistsGuard],
  },
  {
    path: "search",
    component: SearchPage,
  },
  {
    path: "login",
    component: Login,
  },
  {
    path: "page-404",
    component: Page404
  },
  {
    path: "**",
    component: Page404
  }
];
