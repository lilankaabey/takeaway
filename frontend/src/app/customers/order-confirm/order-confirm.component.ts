import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomerService } from '../customer.service';
import { Order } from '../order.model';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.scss']
})
export class OrderConfirmComponent implements OnInit, OnDestroy {

  orderId: string;

  order: Order;
  private getOrderSubs: Subscription;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('orderId')) {
        this.orderId = paramMap.get('orderId');
        console.log(this.orderId);
        this.getOrderSubs = this.customerService.getOrder(this.orderId)
          .subscribe(result => {
            this.order = result.order;
          });
      }
    });

    setTimeout(() => {
      this.router.navigate(['/']);
     }, 6000);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.getOrderSubs) {
      this.getOrderSubs.unsubscribe();
    }
  }

}
