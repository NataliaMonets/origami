import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product/product.model';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isShow = true;
  public totalPrice: number = 0;
  public totalCount: number = 0;
  public headerCart: Array<IProduct> = [];

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.loadCart();
    this.updateCart();
  }

  ngOnDestroy(): void {
    this.orderService.changeCart$.unsubscribe();
  }

  showNav(): void {
    this.isShow = !this.isShow;
  }

  loadCart(): void {
    if(localStorage.getItem('cart')){
      this.headerCart = JSON.parse(<string>localStorage.getItem('cart'));
    }
    this.getTotalPrice();
    this.getTotalCount();
  }

  getTotalPrice(): void {
    if(this.headerCart.length > 0){
      this.totalPrice = this.headerCart.reduce((total, prod) => total + (prod.price * prod.count), 0);
    }
    else {
      this.totalPrice = 0;
    }
  }

  getTotalCount():void {
    if(this.headerCart.length > 0){
      this.totalCount = this.headerCart.reduce((total, prod) => total +  prod.count, 0);
    }
    else {
      this.totalPrice = 0;
    }
  }

  updateCart(): void {
    this.orderService.changeCart$.subscribe(
      () => {
        this.loadCart();
      }, err => {
        console.log(err);
      }
    )
  }
}
