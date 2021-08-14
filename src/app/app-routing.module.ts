import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ProductCategoryComponent } from './pages/product-category/product-category.component';
import { ProNasComponent } from './pages/pro-nas/pro-nas.component';
import { YakZamovitiComponent } from './pages/yak-zamoviti/yak-zamoviti.component';
import { SertifikatiComponent } from './pages/sertifikati/sertifikati.component';
import { VidgukiComponent } from './pages/vidguki/vidguki.component';
import { PromotionsComponent } from './pages/promotions/promotions.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { HitsComponent } from './pages/hits/hits.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'promotions', component: PromotionsComponent },
  { path: 'product-category/:category', component: ProductCategoryComponent },
  { path: 'products-category/:category/:name', component: ProductDetailsComponent },
  { path: 'pro-nas', component: ProNasComponent },
  { path: 'yak-zamoviti', component: YakZamovitiComponent },
  { path: 'sertifikati', component: SertifikatiComponent },
  { path: 'vidguki', component: VidgukiComponent },
  { path: 'cart', component: CartComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'hits', component: HitsComponent },
  // { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] ,children: [
  //   { path: '', pathMatch: 'full', redirectTo: 'discount' },
  //   { path: 'category', component: AdminCategoryComponent },
  //   { path: 'product', component: AdminProductComponent },
  //   { path: 'order', component: AdminOrderComponent },
  // ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
