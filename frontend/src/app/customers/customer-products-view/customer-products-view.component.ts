import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-products-view',
  templateUrl: './customer-products-view.component.html',
  styleUrls: ['./customer-products-view.component.scss']
})
export class CustomerProductsViewComponent implements OnInit {

  isOrderView = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.router.url);

    this.isOrderView = (this.router.url === '/order') ? true : false;
  }

}
