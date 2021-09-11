import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from '../../models/product/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private resourceUrl = environment.BACKEND_URL;
  
  private api = {
    products: `${this.resourceUrl}products`
  }

  constructor(private http: HttpClient) { } 

  get(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(this.api.products);
  }

  getByCategory(categoryName: string): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(`${this.api.products}?category.path=${categoryName}`);
  }

  getByCategoryLimit(categoryName: string): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(`${this.api.products}?category.path=${categoryName}&_limit=3`);
  }

  getByID(id: number): Observable<any> {
    return this.http.get<any>(`${this.api.products}/${id}`);
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
