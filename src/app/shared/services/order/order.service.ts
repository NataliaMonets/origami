import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from '../../models/product/product.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public changeCart$ = new Subject<boolean>();

  private resourceUrl = environment.BACKEND_URL;

  private api = {
    orders: `${this.resourceUrl}orders`
  }

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<any> {
    return this.http.get<any>(this.api.orders);
  }

  create(order: any): Observable<any> {
    return this.http.post<any>(this.api.orders, order);
  }

  addToCart(product: IProduct): void {
    let cart: Array<IProduct> = [];
    if(localStorage.getItem('cart')){
      cart = JSON.parse(<string>localStorage.getItem('cart'));
      if(cart.some(prod => prod.id === product.id)){
        const index = cart.findIndex(prod => prod.id === product.id);
        cart[index].count += product.count;
      } else {
        cart.push(product);
      }
    } else {
      cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    this.changeCart$.next(true);
    product.count = 1;
  }
}