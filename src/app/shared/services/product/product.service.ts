import { Injectable } from '@angular/core';
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
  ]
  constructor() { }

  getProducts(): Array<IProduct> {
    return this.arrProduct;
  }

  addProducts(product: IProduct): void {
    this.arrProduct.push(product);
  } 
}
