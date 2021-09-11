import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/shared/models/category/category.model';
import { IProduct } from 'src/app/shared/models/product/product.model';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.scss']
})
export class HomeProductsComponent implements OnInit {
  public userProduct: Array<IProduct> = [];
  @Input() homeCategory: string = '';
  
  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
  ) {
   }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    // const categoryName = this.homeCategory;
    this.productService.getByCategoryLimit(this.homeCategory as string).subscribe(
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
