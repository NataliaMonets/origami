import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { CartComponent } from './pages/cart/cart.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { HitsComponent } from './pages/hits/hits.component';
import { HomeComponent } from './pages/home/home.component';
import { ProNasComponent } from './pages/pro-nas/pro-nas.component';
import { ProductCategoryComponent } from './pages/product-category/product-category.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { PromotionsComponent } from './pages/promotions/promotions.component';
import { SertifikatiComponent } from './pages/sertifikati/sertifikati.component';
import { VidgukiComponent } from './pages/vidguki/vidguki.component';
import { YakZamovitiComponent } from './pages/yak-zamoviti/yak-zamoviti.component';

// import { AngularFireModule } from '@angular/fire';
// import { AngularFireStorageModule } from '@angular/fire/storage';
// import { AngularFireAuthModule } from '@angular/fire/auth';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HeaderComponent,
    FooterComponent,
    AdminCategoryComponent,
    AdminOrderComponent,
    AdminProductComponent,
    CartComponent,
    ContactsComponent,
    HitsComponent,
    HomeComponent,
    ProNasComponent,
    ProductCategoryComponent,
    ProductDetailsComponent,
    PromotionsComponent,
    SertifikatiComponent,
    VidgukiComponent,
    YakZamovitiComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
    // AngularFireModule.initializeApp(environment.firebaseConfig),
    // AngularFireStorageModule,
    // AngularFireAuthModule,
    // AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
