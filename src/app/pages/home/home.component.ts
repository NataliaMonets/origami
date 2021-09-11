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
  }
}
