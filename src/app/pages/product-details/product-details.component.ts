import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product/product.model';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  public product!: IProduct; 

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('name'));
    this.productService.getByID(id).subscribe(
      data => {
        this.product = data;
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