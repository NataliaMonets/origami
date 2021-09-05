import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product/product.model';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {

  public userProduct: Array<IProduct> = [];

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private orderService: OrderService

  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const categoryName = this.activatedRoute.snapshot.paramMap.get('category');
        this.loadProducts(categoryName as string);
      }
    })
  }

  ngOnInit(): void {

  }

  loadProducts(categoryName: string): void {
    this.productService.getByCategory(categoryName as string).subscribe(
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
    }
    else {
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
