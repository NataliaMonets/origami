import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProduct } from 'src/app/shared/models/product/product.model';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  showPreOrder = true;
  public cart: Array<IProduct> = [];
  public totalPayment!: string;
  public totalPrice = 0;

  public orderForm!: FormGroup;

  constructor(
    private orderService: OrderService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initOrderForm();
    this.getLocalProducts();
  }

  initOrderForm(): void {
    this.orderForm = this.fb.group({
      userName: [null, Validators.required],
      userPhone: [null, Validators.required],
      userEmail: [null],
      userCity: [null, Validators.required],
      userStreet: [null, Validators.required],
      userHouse: [null, Validators.required],
      userFlat: [null, Validators.required],
      userComment: [null]
    })
  }

  private getLocalProducts(): void {
    if (localStorage.getItem('cart')) {
      this.cart = JSON.parse(<string>localStorage.getItem('cart'));
      this.totalPrice = this.getTotal(this.cart);
    }
    console.log(this.cart);
  }

  private getTotal(products: Array<IProduct>): number {
    return products.reduce((total, prod) => total + (prod.price * prod.count), 0);
  }

  productCount(product: IProduct, status: boolean): void {
    if (status) {
      product.count++;
    }
    else {
      if (product.count > 1) {
        product.count--;
      }
    }
    this.totalPrice = this.getTotal(this.cart);
    this.orderService.changeCart$.next(true);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  removeProduct(product: IProduct): void {
      const index = this.cart.findIndex(prod => prod.id === product.id);
      this.cart.splice(index, 1);
      this.totalPrice = this.getTotal(this.cart);
      this.orderService.changeCart$.next(true);
      localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  addOrder(): void {
    const order = {
      ...this.orderForm.value,
      products: this.cart,
      totalPrice: this.totalPrice
    }
    this.orderService.create(order).subscribe(
      () => {
        this.cart = [];
        localStorage.removeItem('cart');
        this.orderService.changeCart$.next(true);
        this.orderForm.reset();
      }, err => {
        console.log(err);

      }
    )
  }

  preOrder(): void {
    this.showPreOrder = !this.showPreOrder;
  }

}
