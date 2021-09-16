import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.scss']
})
export class AdminOrderComponent implements OnInit {

  public adminOrder: Array<any> = [];

  constructor(
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.loadOrder();

  }

  loadOrder(): void {
    this.orderService.get().subscribe(
      data => {
        this.adminOrder = data;
      }, err => {
        console.log(err);
      }
    )
  }

  deleteOrder(order: any): void {
    this.orderService.delete(order.id as number).subscribe(
      () => {
        this.loadOrder();
      }, err => {
        console.log(err);
      }
    )
  }
}
