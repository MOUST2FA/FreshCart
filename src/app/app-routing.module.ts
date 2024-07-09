import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:'', canActivate:[authGuard] , loadComponent:()=>import('./layout/blank/blank.component').then((m)=>m.BlankComponent),children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home' ,title:'Home', loadComponent:()=>import('./components/home/home.component').then((m)=>m.HomeComponent)},
    {path:'product' ,title:'Product', loadComponent:()=>import('./components/product/product.component').then((m)=>m.ProductComponent)},
    {path:'categories' ,title:'Categories', loadComponent:()=>import('./components/categories/categories.component').then((m)=>m.CategoriesComponent)},
    {path:'categories-product/:id' ,title:'Categories-Product', loadComponent:()=>import('./components/categories-product/categories-product.component').then((m)=>m.CategoriesProductComponent)},
    {path:'brands' ,title:'Brands', loadComponent:()=>import('./components/brands/brands.component').then((m)=>m.BrandsComponent)},
    {path:'brand-product/:id' ,title:'Brand-Product', loadComponent:()=>import('./components/brand-product/brand-product.component').then((m)=>m.BrandProductComponent)},
    {path:'cart' ,title:'Cart', loadComponent:()=>import('./components/cart/cart.component').then((m)=>m.CartComponent)},
    {path:'wishlist' ,title:'Wishlist', loadComponent:()=>import('./components/wishlist/wishlist.component').then((m)=>m.WishlistComponent)},
    {path:'forgetpassword' ,title:'ForgetPassword', loadComponent:()=>import('./components/forget-password/forget-password.component').then((m)=>m.ForgetPasswordComponent)},
    {path:'payment/:id' ,title:'Payment', loadComponent:()=>import('./components/payment/payment.component').then((m)=>m.PaymentComponent)},
    {path:'allorders' ,title:'AllOrders', loadComponent:()=>import('./components/allorders/allorders.component').then((m)=>m.AllordersComponent)},
    {path:'details/:id' ,title:'Details', loadComponent:()=>import('./components/details/details.component').then((m)=>m.DetailsComponent)},
  ],},

  {path:'',loadComponent:()=>import('./layout/auth/auth.component').then((m)=>m.AuthComponent),children:[
    {path:'login' ,title:'Login', loadComponent:()=>import('./components/login/login.component').then((m)=>m.LoginComponent)},
    {path:'register' ,title:'Register', loadComponent:()=>import('./components/register/register.component').then((m)=>m.RegisterComponent)},
    {path:'forgetpass' ,title:'ForgetPassword', loadComponent:()=>import('./components/forget-password/forget-password.component').then((m)=>m.ForgetPasswordComponent)},
  ],},

  {path:'**',loadComponent:()=>import('./components/notfound/notfound.component').then((m)=>m.NotfoundComponent)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
