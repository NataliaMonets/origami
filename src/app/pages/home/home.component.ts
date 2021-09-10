import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product/product.model';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public userProduct: Array<IProduct> = [];
  
  constructor(
    private productService: ProductService,
    private orderService: OrderService
  ) {
   }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.get().subscribe(
      data => {
        this.userProduct = data;
      }, err => {
        console.log(err);
      }
    )
  }

  countProduct(product: IProduct, checker: boolean): void {
    if (checker) {
      product.count++;
    } else {
      if (product.count > 1) {
        product.count--;
      }
    }
  }

  addToCart(product: IProduct): void {
    this.orderService.addToCart(product);
    product.count = 1;
  }
}
