import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct, Product } from '../../models/product/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private resourceUrl = environment.BACKEND_URL;

  // private arrProduct: Array<IProduct> = [
  //   {
  //     id: 1,
  //     title: 'ПІЦА МАРГАРИТА',
  //     description: 'помідор, моцарела, пармезан, спеції, соус',
  //     image: 'https://origami.lviv.ua/image/vmmcrksfcd/marharyta-small.jpg',
  //     price: '128 грн',
  //     weight: '500 г',
  //     path: 'pizza'
  //   }
  // ];
  
  private api = {
    products: `${this.resourceUrl}products`
  }

  // private url: string;
  constructor(private http: HttpClient) { 
    // this.url = 'http://localhost:3000/products';
  }

  // getProducts(): Array<IProduct> {
  //   return this.arrProduct;
  // }

  // addProducts(product: IProduct): void {
  //   this.arrProduct.push(product);
  // } 

  get(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(this.api.products);
  }

  create(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.api.products, product)
  }

  delete(id:number): Observable<IProduct> {
    return this.http.delete<IProduct>(`${this.api.products}/${id}`);
  }

  update(product: IProduct, id: number): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.api.products}/${id}`, product)
  }
}
