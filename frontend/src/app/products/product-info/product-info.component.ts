import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {
  productId: string;
  productInfo: Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('productId')) {
        this.productId = paramMap.get('productId');
        this.productService.getProduct(this.productId)
          .subscribe(productData => {
            console.log(productData);
            this.productInfo = productData.product;
          });
      }
    });
  }

  onEditInfo() {
    this.router.navigate(['../edit/', this.productInfo._id], {relativeTo: this.route});
  }

}
