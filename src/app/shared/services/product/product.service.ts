import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../../models/product/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private arrProduct: Array<IProduct> = [
    {
      id: 1,
      title: 'ПІЦА МАРГАРИТА',
      description: 'помідор, моцарела, пармезан, спеції, соус',
      image: 'https://origami.lviv.ua/image/vmmcrksfcd/marharyta-small.jpg',
      price: '128 грн',
      weight: '500 г',
      path: 'pizza'
    }
  ];
  
  private url: string;
  constructor(private http: HttpClient) { 
    this.url = 'http://localhost:3000/products';
  }

  getProducts(): Array<IProduct> {
    return this.arrProduct;
  }

  addProducts(product: IProduct): void {
    this.arrProduct.push(product);
  } 

  get(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(this.url);
  }
}
