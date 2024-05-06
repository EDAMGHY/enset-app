import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { NewProductComponent } from './new-product/new-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { LoginComponent } from './login/login.component';
import { AdminTempComponent } from './admin-temp/admin-temp.component';
import { AuthorizeGuard } from './guards/authorize.guard';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  { path: 'login', component: LoginComponent },

  {
    path: 'admin',
    component: AdminTempComponent,
    canActivate: [AuthorizeGuard],
    data: { roles: ['USER'] },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'products' },

      {
        path: 'products',
        component: ProductsComponent,
        canActivate: [AuthorizeGuard],
        data: { roles: ['USER'] },
      },
      {
        path: 'edit-product/:id',
        component: EditProductComponent,
        canActivate: [AuthorizeGuard],
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'new-product',
        component: NewProductComponent,
        canActivate: [AuthorizeGuard],
        data: { roles: ['ADMIN'] },
      },
    ],
  },
  {
    path: 'notAuthorized',
    component: NotAuthorizedComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'home',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
